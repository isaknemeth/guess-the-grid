import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Stats {
  totalGames: number;
  wins: number;
  averageGuesses: number;
}

const UserStats = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) return;

      const { data, error } = await supabase
        .from('game_results')
        .select('*')
        .eq('user_id', session.user.id);

      if (error) {
        console.error('Error fetching stats:', error);
        return;
      }

      if (data) {
        const totalGames = data.length;
        const wins = data.filter(game => game.correct).length;
        const totalGuesses = data.reduce((sum, game) => sum + game.num_guesses, 0);
        
        setStats({
          totalGames,
          wins,
          averageGuesses: totalGames > 0 ? +(totalGuesses / totalGames).toFixed(1) : 0
        });
      }
      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading stats...</div>;
  }

  if (!stats) {
    return <div className="text-center py-4">No stats available</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-center">Your Statistics</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold">{stats.totalGames}</div>
          <div className="text-sm text-muted-foreground">Played</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">
            {stats.totalGames > 0 ? Math.round((stats.wins / stats.totalGames) * 100) : 0}%
          </div>
          <div className="text-sm text-muted-foreground">Win Rate</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{stats.averageGuesses}</div>
          <div className="text-sm text-muted-foreground">Avg. Guesses</div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;