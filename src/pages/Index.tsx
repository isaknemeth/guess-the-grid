import PowerGuessGame from "@/components/PowerGuessGame";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import countriesData from "@/data/countries.json";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Link } from "react-router-dom";

// Convert the dataset to the required format
const countries = Object.keys(countriesData).map((countryName) => {
  const country = countriesData[countryName];
  return {
    name: countryName,
    latitude: country.latitude,
    longitude: country.longitude,
    energyMix: {
      hydro: country.Electricity.Hydro || 0,
      wind: country.Electricity.Wind || 0,
      nuclear: country.Electricity.Nuclear || 0,
      solar: country.Electricity.Solar || 0,
      other_renewables: country.Electricity.Other_Renewables || 0,
      oil: country.Electricity.Oil || 0,
      gas: country.Electricity.Gas || 0,
      coal: country.Electricity.Coal || 0,
      biofuel: country.Electricity.Biofuel || 0,
    },
  };
});

export const getRandomCountry = () => {
  const randomIndex = Math.floor(Math.random() * countries.length);
  return countries[randomIndex];
};

const sampleData = {
  targetCountry: getRandomCountry(),
  countries,
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Info Button */}
      <div className="fixed top-4 left-4 z-50">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              <Info className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <p className="font-medium">About Power_Guessr</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Welcome to Power_Guessr! Your goal is to guess the country based on its electricity generation. You have 5 guesses to find the correct country.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Distances are calculated to a central point in the country, not necessarily the closest one. All data is from 2022.
            </p>
          </PopoverContent>
        </Popover>
      </div>

      <div className="container max-w-5xl mx-auto px-4 py-8 md:py-12">
        {/* Game Container */}
        <div className="relative">
          {/* Background decorative elements */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-purple-500/5 to-blue-500/5 rounded-[2rem] blur-xl" />
          <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/5 via-purple-500/5 to-primary/5 rounded-[2rem] blur-xl" />

          {/* Main content */}
          <div className="relative bg-background/50 dark:bg-background/40 backdrop-blur-xl rounded-[2rem] border border-border shadow-xl">
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            
            <div className="p-4 md:p-8">
              <PowerGuessGame
                targetCountry={sampleData.targetCountry}
                countries={sampleData.countries}
              />
            </div>
          </div>

          {/* Bottom glow */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-primary/10 blur-3xl rounded-full" />
        </div>
      </div>

      {/* Footer with Privacy Policy Link */}
      <footer className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
        <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Privacy Policy
        </Link>
        <Link to="/terms-of-service" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Terms of Service
        </Link>
      </footer>
    </div>
  );
};

export default Index;