import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CountryData, GuessResult } from "@/types/game";
import { useToast } from "@/components/ui/use-toast";
import { getRandomCountry } from "@/pages/Index";
import { feature } from "topojson-client";
import { Feature, FeatureCollection, Geometry } from "geojson";

export const useGameState = (initialTargetCountry: CountryData, isDaily: boolean = false) => {
  const [guesses, setGuesses] = useState<GuessResult[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [targetCountry, setTargetCountry] = useState<CountryData>(initialTargetCountry);
  const [worldData, setWorldData] = useState<FeatureCollection | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load and process the TopoJSON data
    fetch("/world-110m.json")
      .then(response => response.json())
      .then(topology => {
        const geojson = feature(topology, topology.objects.countries) as FeatureCollection;
        setWorldData(geojson);
      })
      .catch(error => {
        console.error("Error loading world data:", error);
      });
  }, []);

  const findCountryFeature = useCallback((countryName: string) => {
    if (!worldData) return null;
    return worldData.features.find(f => 
      f.properties?.name === countryName
    );
  }, [worldData]);

  const calculateDistance = useCallback((guessCountry: CountryData, targetCountry: CountryData) => {
    if (!worldData) return 0;

    const guessFeature = findCountryFeature(guessCountry.name);
    const targetFeature = findCountryFeature(targetCountry.name);

    if (!guessFeature || !targetFeature) {
      console.warn("Country features not found:", guessCountry.name, targetCountry.name);
      return 0;
    }

    // Check if countries share a border using GeoJSON topology
    const guessGeometry = guessFeature.geometry;
    const targetGeometry = targetFeature.geometry;

    // If countries share a border, distance is 0
    if (sharesBorder(guessGeometry, targetGeometry)) {
      return 0;
    }

    // Otherwise calculate the distance between centers
    const R = 6371;
    const dLat = (targetCountry.latitude - guessCountry.latitude) * Math.PI / 180;
    const dLon = (targetCountry.longitude - guessCountry.longitude) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(guessCountry.latitude * Math.PI / 180) * Math.cos(targetCountry.latitude * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  }, [worldData, findCountryFeature]);

  const sharesBorder = (geom1: Geometry, geom2: Geometry): boolean => {
    // This is a simplified check. For a more accurate check, you'd need to:
    // 1. Convert MultiPolygon to array of coordinates
    // 2. Check if any coordinates match between the two geometries
    // 3. Handle special cases (islands, etc.)
    
    // For now, we'll use a simple coordinate matching approach
    const coords1 = getAllCoordinates(geom1);
    const coords2 = getAllCoordinates(geom2);

    // Check if any coordinates match (sharing a border point)
    return coords1.some(c1 => 
      coords2.some(c2 => 
        Math.abs(c1[0] - c2[0]) < 0.01 && Math.abs(c1[1] - c2[1]) < 0.01
      )
    );
  };

  const getAllCoordinates = (geometry: Geometry): number[][] => {
    let coords: number[][] = [];
    
    if (geometry.type === "Polygon") {
      coords = geometry.coordinates[0];
    } else if (geometry.type === "MultiPolygon") {
      geometry.coordinates.forEach(poly => {
        coords = [...coords, ...poly[0]];
      });
    }
    
    return coords;
  };

  const calculateDirection = useCallback((lat1: number, lon1: number, lat2: number, lon2: number) => {
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const lat1Rad = lat1 * Math.PI / 180;
    const lat2Rad = lat2 * Math.PI / 180;
  
    const y = Math.sin(dLon) * Math.cos(lat2Rad);
    const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) -
              Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);
    const bearing = Math.atan2(y, x) * 180 / Math.PI;
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(((bearing + 360) % 360) / 45) % 8;
    return directions[index];
  }, []);

  const saveGameResult = useCallback(async (correct: boolean, numGuesses: number) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user?.id) {
      try {
        const { error } = await supabase
          .from('game_results')
          .insert({
            correct,
            num_guesses: numGuesses,
            country_guessed: targetCountry.name,
            user_id: session.user.id,
            is_daily: isDaily
          });

        if (error) {
          console.error('Error saving game result:', error);
          toast({
            title: "Error saving game result",
            description: "There was an error saving your game result.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error saving game result:', error);
      }
    }
  }, [targetCountry.name, toast, isDaily]);

  const handleGuess = useCallback((countryName: string, countries: CountryData[]) => {
    const guessCountry = countries.find(c => c.name === countryName);
    
    if (!guessCountry) {
      toast({
        title: "Invalid country",
        description: "Please select a valid country from the dropdown",
        variant: "destructive",
      });
      return;
    }

    const distance = calculateDistance(guessCountry, targetCountry);

    const direction = calculateDirection(
      guessCountry.latitude,
      guessCountry.longitude,
      targetCountry.latitude,
      targetCountry.longitude
    );

    const isCorrect = guessCountry.name === targetCountry.name;
    const newGuesses = [...guesses, {
      country: guessCountry.name,
      distance,
      direction,
      isCorrect,
    }];

    setGuesses(newGuesses);

    if (isCorrect) {
      toast({
        title: "Congratulations!",
        description: "You found the correct country!",
      });
      setGameOver(true);
      saveGameResult(true, newGuesses.length);
    } else if (newGuesses.length >= 5) {
      toast({
        title: "Game Over",
        description: `The correct country was ${targetCountry.name}`,
        variant: "destructive",
      });
      setGameOver(true);
      saveGameResult(false, 5);
    }
  }, [guesses, targetCountry, toast, calculateDistance, calculateDirection, saveGameResult]);

  const resetGame = useCallback(() => {
    if (!isDaily) {
      setGuesses([]);
      setGameOver(false);
      setTargetCountry(getRandomCountry());
    }
  }, [isDaily]);

  return {
    guesses,
    gameOver,
    targetCountry,
    handleGuess,
    resetGame
  };
};
