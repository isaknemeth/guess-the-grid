import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface GameOverProps {
  targetCountry: string;
  onReset: () => void;
}

const GameOver = ({ targetCountry, onReset }: GameOverProps) => {
  return (
    <div className="text-center mt-4">
      <div className="text-sm text-muted-foreground mb-2">
        The correct country was {targetCountry}.
      </div>
      <Button
        variant="outline"
        onClick={onReset}
        className="flex items-center justify-center gap-2"
      >
        <RotateCcw className="h-4 w-4" />
        Play Again
      </Button>
    </div>
  );
};

export default GameOver;