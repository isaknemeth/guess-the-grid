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
    <div className="min-h-screen bg-gradient-to-r from-[#243949] to-[#517fa4] py-8">
      <div className="container">
        <h1 className="text-4xl font-bold text-white text-center mb-8">PowerGuess</h1>
        <div className="bg-white rounded-lg shadow-xl p-6">
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