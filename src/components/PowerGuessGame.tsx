import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import EnergyChart from "./EnergyChart";
import GuessList from "./GuessList";
import { getRandomCountry } from "@/pages/Index";

import { CountryData, GuessResult } from "@/types/game";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";


interface PowerGuessGameProps {
  targetCountry: CountryData;
  countries: CountryData[];
}

const PowerGuessGame = ({ targetCountry: initialTargetCountry, countries }: PowerGuessGameProps) => {
  const [guesses, setGuesses] = useState<GuessResult[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [targetCountry, setTargetCountry] = useState<CountryData>(initialTargetCountry)
  const { toast } = useToast();

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  const calculateDirection = (lat1: number, lon1: number, lat2: number, lon2: number) => {
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
  };

  const handleGuess = (countryName: string) => {
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

    const newGuess: GuessResult = {
      country: guessCountry.name,
      distance,
      direction,
      isCorrect: guessCountry.name === targetCountry.name,
    };

    const newGuesses = [...guesses, newGuess];
    setGuesses(newGuesses);
    setCurrentGuess("");
    setSearchValue("");
    setOpen(false);

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

  const resetGame = () => {
    setGuesses([]);
    setCurrentGuess("");
    setSearchValue("");
    setGameOver(false);
    setOpen(false);
    setTargetCountry(getRandomCountry());
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="w-full">
      <EnergyChart

        hydro={targetCountry.energyMix.hydro}
        wind={targetCountry.energyMix.wind}
        nuclear={targetCountry.energyMix.nuclear}
        solar={targetCountry.energyMix.solar}
        other_renewables={targetCountry.energyMix.other_Renewables}
        oil={targetCountry.energyMix.oil}
        gas={targetCountry.energyMix.gas}
        coal={targetCountry.energyMix.coal}
        biofuel={targetCountry.energyMix.biofuel}
      />
      
      <div className="mt-6 space-y-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              disabled={gameOver}
              className="w-full justify-between"
            >
              {currentGuess
                ? countries.find((country) => country.name === currentGuess)?.name
                : "Select a country..."}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput 
                placeholder="Search country..." 
                value={searchValue}
                onValueChange={setSearchValue}
              />
              <CommandList>
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandGroup>
                  {filteredCountries.map((country) => (
                    <CommandItem
                      key={country.name}
                      value={country.name}
                      onSelect={(currentValue) => {
                        setCurrentGuess(currentValue);
                        handleGuess(currentValue);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          currentGuess === country.name ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {country.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        
        <div className="text-sm text-muted-foreground">
          {5 - guesses.length} guesses remaining
        </div>

        <GuessList guesses={guesses} />

        {gameOver && (
          <div className="text-center mt-4">
            <div className="text-sm text-muted-foreground mb-2">
              The correct country was {targetCountry.name}.
            </div>
            <Button variant="outline" onClick={resetGame} className="flex items-center justify-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Play Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PowerGuessGame;