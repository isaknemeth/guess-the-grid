import { Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface GameStatusProps {
  remainingGuesses: number;
  isDaily?: boolean;
}

const GameStatus = ({ remainingGuesses, isDaily = false }: GameStatusProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col">
        <div className="text-sm font-medium">
          Remaining guesses: {remainingGuesses}
        </div>
        {isDaily && (
          <div className="text-xs text-muted-foreground">
            Daily Challenge
          </div>
        )}
      </div>
      
      <Dialog>
        <DialogTrigger asChild>
          <button 
            className="inline-flex items-center p-1 rounded-full hover:bg-muted/50 transition-colors"
            type="button"
            aria-label="Game information"
          >
            <Info className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md p-4 max-h-[90vh] w-[90vw] sm:w-full">
          <div className="space-y-2 text-sm">
            <p>🎯 <strong>Distance:</strong> Shows the shortest distance between the centers of your guessed country and the target country (in km)</p>
            <p>🧭 <strong>Direction:</strong> The arrow points along the shortest path from your guess towards the target country using 8 directions (N, NE, E, SE, S, SW, W, NW)</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GameStatus;