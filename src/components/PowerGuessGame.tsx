import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import EnergyChart from "./EnergyChart";
import GuessList from "./GuessList";
import { CountryData, GuessResult } from "@/types/game";

interface PowerGuessGameProps {
  targetCountry: CountryData;
  countries: CountryData[];
}

const PowerGuessGame = ({ targetCountry, countries }: PowerGuessGameProps) => {
  const [guesses, setGuesses] = useState<GuessResult[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const { toast } = useToast();

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const calculateDirection = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const y = Math.sin(dLon) * Math.cos(lat2 * Math.PI / 180);
    const x = Math.cos(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180) -
              Math.sin(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.cos(dLon);
    const bearing = Math.atan2(y, x) * 180 / Math.PI;
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(((bearing + 360) % 360) / 45) % 8;
    return directions[index];
  };

  const handleGuess = () => {
    const guessCountry = countries.find(c => c.name.toLowerCase() === currentGuess.toLowerCase());
    
    if (!guessCountry) {
      toast({
        title: "Invalid country",
        description: "Please enter a valid country name",
        variant: "destructive",
      });
      return;
    }

    const distance = calculateDistance(
      guessCountry.latitude,
      guessCountry.longitude,
      targetCountry.latitude,
      targetCountry.longitude
    );

    const direction = calculateDirection(
      guessCountry.latitude,
      guessCountry.longitude,
      targetCountry.latitude,
      targetCountry.longitude
    );

    const newGuess: GuessResult = {
      country: guessCountry.name,
      distance,
      direction,
    };

    const newGuesses = [...guesses, newGuess];
    setGuesses(newGuesses);
    setCurrentGuess("");

    if (guessCountry.name === targetCountry.name) {
      toast({
        title: "Congratulations!",
        description: "You found the correct country!",
      });
      setGameOver(true);
    } else if (newGuesses.length >= 5) {
      toast({
        title: "Game Over",
        description: `The correct country was ${targetCountry.name}`,
        variant: "destructive",
      });
      setGameOver(true);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <EnergyChart
        solar={targetCountry.energyMix.solar}
        wind={targetCountry.energyMix.wind}
        nuclear={targetCountry.energyMix.nuclear}
      />
      
      <div className="mt-6">
        <div className="flex gap-2">
          <Input
            value={currentGuess}
            onChange={(e) => setCurrentGuess(e.target.value)}
            placeholder="Enter country name"
            disabled={gameOver}
          />
          <Button onClick={handleGuess} disabled={gameOver || !currentGuess}>
            Guess
          </Button>
        </div>
        
        <div className="mt-2 text-sm text-gray-500">
          {5 - guesses.length} guesses remaining
        </div>

        <GuessList guesses={guesses} />
      </div>
    </div>
  );
};

export default PowerGuessGame;