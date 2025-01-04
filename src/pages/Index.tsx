import PowerGuessGame from "@/components/PowerGuessGame";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

// Extended dataset with more countries
const sampleData = {
  targetCountry: {
    name: "France",
    latitude: 46.2276,
    longitude: 2.2137,
    energyMix: {
      solar: 10,
      wind: 20,
      nuclear: 70,
    },
  },
  countries: [
    {
      name: "France",
      latitude: 46.2276,
      longitude: 2.2137,
      energyMix: {
        solar: 10,
        wind: 20,
        nuclear: 70,
      },
    },
    {
      name: "Germany",
      latitude: 51.1657,
      longitude: 10.4515,
      energyMix: {
        solar: 25,
        wind: 45,
        nuclear: 30,
      },
    },
    {
      name: "Spain",
      latitude: 40.4637,
      longitude: -3.7492,
      energyMix: {
        solar: 40,
        wind: 35,
        nuclear: 25,
      },
    },
    {
      name: "Sweden",
      latitude: 60.1282,
      longitude: 18.6435,
      energyMix: {
        solar: 5,
        wind: 30,
        nuclear: 65,
      },
    },
    {
      name: "Italy",
      latitude: 41.8719,
      longitude: 12.5674,
      energyMix: {
        solar: 35,
        wind: 40,
        nuclear: 25,
      },
    },
    {
      name: "Netherlands",
      latitude: 52.1326,
      longitude: 5.2913,
      energyMix: {
        solar: 20,
        wind: 50,
        nuclear: 30,
      },
    }
  ],
};

const Index = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>

      <div className="container max-w-5xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center space-y-4 mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400 dark:from-purple-400 dark:to-purple-200">
            PowerGuess
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Guess the country by its energy production mix
          </p>
        </div>

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
    </div>
  );
};

export default Index;