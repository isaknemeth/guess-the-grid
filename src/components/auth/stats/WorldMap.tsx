import { ComposableMap, Geographies, Geography } from "react-simple-maps";

interface WorldMapProps {
  correctCountries: string[];
}

const WorldMap = ({ correctCountries }: WorldMapProps) => {
  return (
    <div className="h-96 rounded-lg overflow-hidden">
      <ComposableMap
        projectionConfig={{
          scale: 147,
        }}
        className="w-full h-full"
      >
        <Geographies geography="/world-110m.json">
          {({ geographies }) => {
            console.log("All map countries:", geographies.map(geo => geo.properties.name));
            return geographies.map((geo) => {
              const isCorrect = correctCountries.includes(geo.properties.name);
              console.log(`Country ${geo.properties.name}: ${isCorrect ? 'correct' : 'incorrect'}`);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isCorrect ? "#4ade80" : "#D6D6DA"}
                  stroke="#FFFFFF"
                  style={{
                    default: {
                      outline: "none",
                    },
                    hover: {
                      outline: "none",
                      fill: isCorrect ? "#22c55e" : "#F5F4F6"
                    },
                  }}
                />
              );
            });
          }}
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default WorldMap;