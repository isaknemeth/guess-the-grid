import { memo } from "react";
import { CountryData } from "@/types/game";
import EnergyChart from "./EnergyChart";
import GuessList from "./GuessList";
import GuessInput from "./game/GuessInput";
import GameOver from "./game/GameOver";
import GameStatus from "./game/GameStatus";
import { useGameState } from "@/hooks/useGameState";

interface PowerGuessGameProps {
  targetCountry: CountryData;
  countries: CountryData[];
}

const PowerGuessGame = memo(({ targetCountry: initialTargetCountry, countries }: PowerGuessGameProps) => {
  const { guesses, gameOver, targetCountry, handleGuess, resetGame } = useGameState(initialTargetCountry);

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
          onGuess={(countryName) => handleGuess(countryName, countries)}
          disabled={gameOver}
        />
        
        <GameStatus remainingGuesses={5 - guesses.length} />

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
});

PowerGuessGame.displayName = "PowerGuessGame";

export default PowerGuessGame;