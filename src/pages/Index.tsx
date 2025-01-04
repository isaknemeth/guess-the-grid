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
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2C2F3E] to-[#1A1F2C] py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-white text-center mb-2 animate-fade-in">
          PowerGuess
        </h1>
        <p className="text-gray-400 text-center mb-8 animate-fade-in">
          Guess the country by its energy production mix
        </p>
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/10">
          <PowerGuessGame
            targetCountry={sampleData.targetCountry}
            countries={sampleData.countries}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;