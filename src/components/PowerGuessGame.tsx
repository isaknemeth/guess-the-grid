import { memo, useState } from "react";
import { CountryData } from "@/types/game";
import EnergyChart from "./EnergyChart";
import GuessList from "./GuessList";
import GuessInput from "./game/GuessInput";
import GameOver from "./game/GameOver";
import GameStatus from "./game/GameStatus";
import { useGameState } from "@/hooks/useGameState";
import SettingsDialog from "./settings/SettingsDialog";

interface PowerGuessGameProps {
  targetCountry: CountryData;
  countries: CountryData[];
  isDaily?: boolean;
}

const PowerGuessGame = memo(({ targetCountry: initialTargetCountry, countries, isDaily = false }: PowerGuessGameProps) => {
  const [showDistances, setShowDistances] = useState(true);
  const [showDirections, setShowDirections] = useState(true);
  const { guesses, gameOver, targetCountry, handleGuess, resetGame } = useGameState(initialTargetCountry, isDaily);

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
          <GameStatus remainingGuesses={5 - guesses.length} isDaily={isDaily} />
          <SettingsDialog
            showDistances={showDistances}
            setShowDistances={setShowDistances}
            showDirections={showDirections}
            setShowDirections={setShowDirections}
          />
        </div>

        <GuessInput
          countries={countries}
          onGuess={(countryName) => handleGuess(countryName, countries)}
          disabled={gameOver}
        />

        <GuessList 
          guesses={guesses} 
          showDistances={showDistances}
          showDirections={showDirections}
        />

        {gameOver && (
          <GameOver
            targetCountry={targetCountry.name}
            onReset={isDaily ? undefined : resetGame}
            isDaily={isDaily}
          />
        )}
      </div>
    </div>
  );
});

PowerGuessGame.displayName = "PowerGuessGame";

export default PowerGuessGame;