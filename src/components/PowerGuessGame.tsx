import { useState, useCallback, useMemo } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import EnergyChart from "./EnergyChart";
import GuessList from "./GuessList";
import GuessInput from "./game/GuessInput";
import GameOver from "./game/GameOver";
import { getRandomCountry } from "@/pages/Index";
import { CountryData, GuessResult } from "@/types/game";

interface PowerGuessGameProps {
  targetCountry: CountryData;
  countries: CountryData[];
}

const PowerGuessGame = ({ targetCountry: initialTargetCountry, countries }: PowerGuessGameProps) => {
  const [guesses, setGuesses] = useState<GuessResult[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [targetCountry, setTargetCountry] = useState<CountryData>(initialTargetCountry);
  const { toast } = useToast();

  const calculateDistance = useCallback((lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }, []);

  const calculateDirection = useCallback((lat1: number, lon1: number, lat2: number, lon2: number) => {
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const lat1Rad = lat1 * Math.PI / 180;
    const lat2Rad = lat2 * Math.PI / 180;
  
    const y = Math.sin(dLon) * Math.cos(lat2Rad);
    const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) -
              Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);
    const bearing = Math.atan2(y, x) * 180 / Math.PI;
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(((bearing + 360) % 360) / 45) % 8;
    return directions[index];
  }, []);

  const saveGameResult = useCallback(async (correct: boolean, numGuesses: number, countryGuessed: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user?.id) {
      try {
        const { error } = await supabase
          .from('game_results')
          .insert({
            correct,
            num_guesses: numGuesses,
            country_guessed: countryGuessed,
            user_id: session.user.id
          });

        if (error) throw error;
      } catch (error) {
        console.error('Error saving game result:', error);
      }
    }
  }, []);

  const handleGuess = useCallback((countryName: string) => {
    const guessCountry = countries.find(c => c.name === countryName);
    
    if (!guessCountry) {
      toast({
        title: "Invalid country",
        description: "Please select a valid country from the dropdown",
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

    const isCorrect = guessCountry.name === targetCountry.name;
    const newGuesses = [...guesses, {
      country: guessCountry.name,
      distance,
      direction,
      isCorrect,
    }];

    setGuesses(newGuesses);

    if (isCorrect) {
      toast({
        title: "Congratulations!",
        description: "You found the correct country!",
      });
      setGameOver(true);
      saveGameResult(true, newGuesses.length, guessCountry.name);
    } else if (newGuesses.length >= 5) {
      toast({
        title: "Game Over",
        description: `The correct country was ${targetCountry.name}`,
        variant: "destructive",
      });
      setGameOver(true);
      saveGameResult(false, newGuesses.length, guessCountry.name);
    }
  }, [guesses, targetCountry, countries, toast, calculateDistance, calculateDirection, saveGameResult]);

  const resetGame = useCallback(() => {
    setGuesses([]);
    setGameOver(false);
    setTargetCountry(getRandomCountry());
  }, []);

  return (
    <div className="w-full">
      <EnergyChart
        hydro={targetCountry.energyMix.hydro}
        wind={targetCountry.energyMix.wind}
        nuclear={targetCountry.energyMix.nuclear}
        solar={targetCountry.energyMix.solar}
        other_renewables={targetCountry.energyMix.other_renewables}
        oil={targetCountry.energyMix.oil}
        gas={targetCountry.energyMix.gas}
        coal={targetCountry.energyMix.coal}
        biofuel={targetCountry.energyMix.biofuel}
      />
      
      <div className="mt-6 space-y-4">
        <GuessInput
          countries={countries}
          onGuess={handleGuess}
          disabled={gameOver}
        />
        
        <div className="text-sm text-muted-foreground">
          {5 - guesses.length} guesses remaining
        </div>

        <GuessList guesses={guesses} />

        {gameOver && (
          <GameOver
            targetCountry={targetCountry.name}
            onReset={resetGame}
          />
        )}
      </div>
    </div>
  );
};

export default PowerGuessGame;