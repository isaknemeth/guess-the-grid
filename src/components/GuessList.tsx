import { memo } from "react";
import { GuessResult } from "@/types/game";
import { ArrowDown, ArrowDownLeft, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUp, ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface GuessListProps {
  guesses: GuessResult[];
  showDistances?: boolean;
  showDirections?: boolean;
}

const DirectionArrow = memo(({ direction }: { direction: string }) => {
  const arrows = {
    "N": ArrowUp,
    "NE": ArrowUpRight,
    "E": ArrowRight,
    "SE": ArrowDownRight,
    "S": ArrowDown,
    "SW": ArrowDownLeft,
    "W": ArrowLeft,
    "NW": ArrowUpLeft,
  };
  const Arrow = arrows[direction as keyof typeof arrows];
  return Arrow ? <Arrow className="h-4 w-4 sm:h-6 sm:w-6" /> : null;
});

DirectionArrow.displayName = "DirectionArrow";

const GuessItem = memo(({ guess, showDistances, showDirections }: { guess: GuessResult; showDistances?: boolean; showDirections?: boolean }) => (
  <div
    className={cn(
      "flex items-center justify-between p-3 rounded-lg shadow-sm animate-fade-in border",
      guess.isCorrect
        ? "bg-green-500/10 border-green-500/20 dark:bg-green-500/20"
        : "bg-[#ea384c]/5 border-[#ea384c]/20 dark:bg-[#ea384c]/10"
    )}
  >
    <span className="font-medium text-sm sm:text-base">{guess.country}</span>
    {!guess.isCorrect && (
      <div className="flex items-center gap-2 sm:gap-4">
        {showDistances && <span className="text-sm sm:text-base">{Math.round(guess.distance)}km</span>}
        {showDirections && <DirectionArrow direction={guess.direction} />}
      </div>
    )}
  </div>
));

GuessItem.displayName = "GuessItem";

const GuessList = ({ guesses, showDistances = true, showDirections = true }: GuessListProps) => {
  return (
    <div className="space-y-2">
      {guesses.map((guess, index) => (
        <GuessItem 
          key={index} 
          guess={guess} 
          showDistances={showDistances} 
          showDirections={showDirections}
        />
      ))}
    </div>
  );
};

export default memo(GuessList);