export interface CountryData {
  name: string;
  latitude: number;
  longitude: number;
  energyMix: {
    hydro?: number;
    wind?: number;
    nuclear?: number;
    solar?: number;
    other_renewables?: number;
    oil?: number;
    gas?: number;
    coal?: number;
    biofuel?: number;
  };
}

export interface GuessResult {
  country: string;
  distance: number;
  direction: string;
  isCorrect: boolean;
}