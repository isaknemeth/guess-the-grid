import { memo, useState } from "react";
import { CountryData } from "@/types/game";
import EnergyChart from "./EnergyChart";
import GuessList from "./GuessList";
import GuessInput from "./game/GuessInput";
import GameOver from "./game/GameOver";
import GameStatus from "./game/GameStatus";
import { useGameState } from "@/hooks/useGameState";
import { Button } from "./ui/button";
import { MapPin } from "lucide-react";

interface PowerGuessGameProps {
  targetCountry: CountryData;
  countries: CountryData[];
}

const PowerGuessGame = memo(({ targetCountry: initialTargetCountry, countries }: PowerGuessGameProps) => {
  const { guesses, gameOver, targetCountry, handleGuess, resetGame } = useGameState(initialTargetCountry);
  const [showDistances, setShowDistances] = useState(true);

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
        <div className="flex items-center justify-between">
          <GameStatus remainingGuesses={5 - guesses.length} />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDistances(!showDistances)}
            className="flex items-center gap-2"
          >
            <MapPin className="h-4 w-4" />
            {showDistances ? "Hide Distances" : "Show Distances"}
          </Button>
        </div>

        <GuessInput
          countries={countries}
          onGuess={(countryName) => handleGuess(countryName, countries)}
          disabled={gameOver}
        />

        <GuessList guesses={guesses} showDistances={showDistances} />

        {gameOver && (
          <GameOver
            targetCountry={targetCountry.name}
            onReset={resetGame}
          />
        )}
      </div>
    </div>
  );
});

PowerGuessGame.displayName = "PowerGuessGame";

export default PowerGuessGame;