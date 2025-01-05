import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

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
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

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
        
        // Calculate guesses distribution
        const guessesCounts = Array.from({ length: 5 }, (_, i) => ({
          guesses: i + 1,
          count: data.filter(game => game.num_guesses === i + 1).length
        }));

        // Get list of correctly guessed countries
        const correctCountries = data
          .filter(game => game.correct)
          .map(game => game.country_guessed);
        
        setStats({
          totalGames,
          wins,
          averageGuesses: totalGames > 0 ? +(totalGuesses / totalGames).toFixed(1) : 0,
          guessesCounts,
          correctCountries
        });
      }
      setLoading(false);
    };

    fetchStats();
  }, []);

  useEffect(() => {
    if (!mapContainer.current || !stats?.correctCountries.length) return;

    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN'; // Replace with your Mapbox token
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [0, 20],
      zoom: 1
    });

    map.current.on('load', () => {
      if (!map.current) return;

      // Add a new layer for the countries
      map.current.addSource('countries', {
        type: 'vector',
        url: 'mapbox://mapbox.country-boundaries-v1'
      });

      // Add a layer to highlight correctly guessed countries
      map.current.addLayer({
        id: 'country-fills',
        type: 'fill',
        source: 'countries',
        'source-layer': 'country_boundaries',
        paint: {
          'fill-color': [
            'case',
            ['in', ['get', 'name_en'], ['literal', stats.correctCountries]],
            '#4ade80', // Green color for correct countries
            'transparent'
          ],
          'fill-opacity': 0.5
        }
      });
    });

    return () => {
      map.current?.remove();
    };
  }, [stats?.correctCountries]);

  if (loading) {
    return <div className="text-center py-4">Loading stats...</div>;
  }

  if (!stats) {
    return <div className="text-center py-4">No stats available</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-center">Your Statistics</h2>
      
      {/* Summary Stats */}
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

      {/* Guesses Distribution Chart */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stats.guessesCounts}>
            <XAxis dataKey="guesses" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* World Map */}
      <div className="h-64 rounded-lg overflow-hidden">
        <div ref={mapContainer} className="w-full h-full" />
      </div>
    </div>
  );
};

export default UserStats;