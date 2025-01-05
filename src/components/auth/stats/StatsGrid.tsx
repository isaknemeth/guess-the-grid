interface StatsGridProps {
  totalGames: number;
  wins: number;
  averageGuesses: number;
}

const StatsGrid = ({ totalGames, wins, averageGuesses }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="text-center">
        <div className="text-2xl font-bold">{totalGames}</div>
        <div className="text-sm text-muted-foreground">Played</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold">
          {totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0}%
        </div>
        <div className="text-sm text-muted-foreground">Win Rate</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold">{averageGuesses}</div>
        <div className="text-sm text-muted-foreground">Avg. Guesses</div>
      </div>
    </div>
  );
};

export default StatsGrid;