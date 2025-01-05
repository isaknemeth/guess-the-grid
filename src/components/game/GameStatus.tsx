import { memo } from "react";

interface GameStatusProps {
  remainingGuesses: number;
}

const GameStatus = memo(({ remainingGuesses }: GameStatusProps) => (
  <div className="text-sm text-muted-foreground">
    {remainingGuesses} guesses remaining
  </div>
));

GameStatus.displayName = "GameStatus";

export default GameStatus;