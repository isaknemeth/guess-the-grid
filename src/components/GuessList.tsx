import { GuessResult } from "@/types/game";
import { ArrowDown, ArrowDownLeft, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUp, ArrowUpLeft, ArrowUpRight } from "lucide-react";

interface GuessListProps {
  guesses: GuessResult[];
}

const GuessList = ({ guesses }: GuessListProps) => {
  const getDirectionArrow = (direction: string) => {
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
  };

  return (
    <div className="space-y-2">
      {guesses.map((guess, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 bg-card rounded-lg shadow-sm animate-fade-in border border-border/50"
        >
          <span className="font-medium text-sm sm:text-base">{guess.country}</span>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-sm sm:text-base">{Math.round(guess.distance)}km</span>
            {getDirectionArrow(guess.direction)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GuessList;