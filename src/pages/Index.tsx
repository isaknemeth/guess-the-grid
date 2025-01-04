import PowerGuessGame from "@/components/PowerGuessGame";

// This is a placeholder for your JSON data
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
    // Add more countries here
  ],
};

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2C2F3E] to-[#1A1F2C] py-12 px-4">
      <div className="container max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-50 animate-fade-in">
            PowerGuess
          </h1>
          <p className="text-purple-200/80 text-lg animate-fade-in">
            Guess the country by its energy production mix
          </p>
        </div>

        {/* Game Container */}
        <div className="relative">
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent rounded-3xl transform -skew-y-1" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent rounded-3xl transform skew-y-1" />
          
          {/* Main Content */}
          <div className="relative backdrop-blur-xl bg-white/[0.02] rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
            {/* Inner Gradient Border */}
            <div className="absolute inset-px bg-gradient-to-b from-white/20 to-white/0 rounded-3xl pointer-events-none" />
            
            {/* Game Content */}
            <div className="relative p-8">
              <div className="grid gap-8">
                <PowerGuessGame
                  targetCountry={sampleData.targetCountry}
                  countries={sampleData.countries}
                />
              </div>
            </div>
          </div>

          {/* Bottom Decorative Glow */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-purple-500/20 blur-2xl rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Index;