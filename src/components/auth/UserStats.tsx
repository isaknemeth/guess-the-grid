import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import StatsGrid from "./stats/StatsGrid";
import GuessDistribution from "./stats/GuessDistribution";
import MapSection from "./stats/MapSection";
import StatsHeader from "./stats/StatsHeader";
import countriesData from "@/data/countries.json";

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
        const totalGuesses = data
          .filter(game => game.correct)
          .reduce((sum, game) => sum + game.num_guesses, 0);
        
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

  return (
    <div className="space-y-4 pb-4">
      <StatsHeader 
        correctCountriesCount={stats.correctCountries.length}
        totalCountries={totalCountries}
      />
      
      <StatsGrid
        totalGames={stats.totalGames}
        wins={stats.wins}
        averageGuesses={stats.averageGuesses}
      />

      <GuessDistribution guessesCounts={stats.guessesCounts} />
      
      <MapSection 
        correctCountries={stats.correctCountries}
        userEmail={userEmail}
      />
    </div>
  );
};

export default UserStats;