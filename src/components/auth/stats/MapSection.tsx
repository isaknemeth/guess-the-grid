import WorldMap from './WorldMap';

interface MapSectionProps {
  correctCountries: string[];
  userEmail: string | null;
}

const MapSection = ({ correctCountries, userEmail }: MapSectionProps) => {
  return (
    <div className="space-y-2">
      <WorldMap correctCountries={correctCountries} />
      {userEmail && (
        <div className="text-center text-sm text-muted-foreground">
          {userEmail}
        </div>
      )}
    </div>
  );
};

export default MapSection;