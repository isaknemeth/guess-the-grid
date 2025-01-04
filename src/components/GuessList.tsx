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
    return Arrow ? <Arrow className="w-6 h-6" /> : null;
  };

  return (
    <div className="space-y-2 mt-4">
      {guesses.map((guess, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 bg-white rounded-lg shadow animate-fade-in"
        >
          <span className="font-medium">{guess.country}</span>
          <div className="flex items-center gap-4">
            <span>{Math.round(guess.distance)}km</span>
            {getDirectionArrow(guess.direction)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GuessList;