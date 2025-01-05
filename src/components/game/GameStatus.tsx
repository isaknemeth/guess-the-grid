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
      
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              className="inline-flex items-center p-1 rounded-full hover:bg-muted/50 transition-colors"
              type="button"
              aria-label="Game information"
            >
              <Info className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
            </button>
          </TooltipTrigger>
          <TooltipContent 
            side="right" 
            align="center"
            className="max-w-xs"
          >
            <div className="space-y-2 text-sm">
              <p>🎯 <strong>Distance:</strong> Shows the shortest distance between the centers of your guessed country and the target country (in km)</p>
              <p>🧭 <strong>Direction:</strong> The arrow points along the shortest path from your guess towards the target country using 8 directions (N, NE, E, SE, S, SW, W, NW)</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default GameStatus;