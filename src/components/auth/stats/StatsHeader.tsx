interface StatsHeaderProps {
  correctCountriesCount: number;
  totalCountries: number;
}

const StatsHeader = ({ correctCountriesCount, totalCountries }: StatsHeaderProps) => {
  return (
    <>
      <h2 className="text-lg font-semibold text-center">Your Statistics</h2>
      <div className="text-center">
        <div className="text-2xl font-bold">
          {correctCountriesCount}/{totalCountries}
        </div>
        <div className="text-sm text-muted-foreground">Countries Guessed Correctly</div>
      </div>
    </>
  );
};

export default StatsHeader;