import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import StatsGrid from "./stats/StatsGrid";
import GuessDistribution from "./stats/GuessDistribution";
import WorldMap from "./stats/WorldMap";
import countriesData from "@/data/countries.json"

interface Stats {
  totalGames: number;
  wins: number;
  averageGuesses: number;
  guessesCounts: { guesses: number; count: number }[];
  correctCountries: string[];
}

const UserStats = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) return;

      setUserEmail(session.user.email);

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
        
        // Only count guesses for correct attempts when calculating average
        const totalGuesses = data
          .filter(game => game.correct)
          .reduce((sum, game) => sum + game.num_guesses, 0);
        
        // Count correct guesses for each number of attempts
        const guessesCounts = Array.from({ length: 5 }, (_, i) => ({
          guesses: i + 1,
          count: data.filter(game => game.correct && game.num_guesses === i + 1).length
        }));

        const correctCountries = data
          .filter(game => game.correct)
          .map(game => game.country_guessed);

        setStats({
          totalGames,
          wins,
          averageGuesses: wins > 0 ? +(totalGuesses / wins).toFixed(1) : 0,
          guessesCounts,
          correctCountries
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

  const totalCountries = Object.keys(countriesData).length;
  const correctCountriesCount = stats.correctCountries.length;

  return (
    <div className="space-y-4 pb-16">
      <h2 className="text-lg font-semibold text-center">Your Statistics</h2>
      
      <StatsGrid
        totalGames={stats.totalGames}
        wins={stats.wins}
        averageGuesses={stats.averageGuesses}
      />

      <GuessDistribution guessesCounts={stats.guessesCounts} />

      <div className="text-center mt-4">
        <div className="text-2xl font-bold">
          {correctCountriesCount}/{totalCountries}
        </div>
        <div className="text-sm text-muted-foreground mb-2">Countries Guessed Correctly</div>
      </div>
      
      <WorldMap correctCountries={stats.correctCountries} />
      
      {userEmail && (
        <div className="text-center text-sm text-muted-foreground mt-2">
          {userEmail}
        </div>
      )}
    </div>
  );
};

export default UserStats;