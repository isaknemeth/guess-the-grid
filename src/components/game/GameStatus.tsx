import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GameStatusProps {
  remainingGuesses: number;
}

const GameStatus = ({ remainingGuesses }: GameStatusProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="text-sm font-medium">
        Remaining guesses: {remainingGuesses}
      </div>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="inline-flex items-center">
              <Info className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
            </button>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <div className="space-y-2 text-sm">
              <p>🎯 <strong>Distance:</strong> Shows how far your guess is from the target country (in km)</p>
              <p>🧭 <strong>Direction:</strong> The arrow points from your guess towards the target country using 8 directions (N, NE, E, SE, S, SW, W, NW)</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default GameStatus;