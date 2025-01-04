export interface CountryData {
  name: string;
  latitude: number;
  longitude: number;
  energyMix: {
    solar: number;
    wind: number;
    nuclear: number;
  };
}

export interface GuessResult {
  country: string;
  distance: number;
  direction: string;
  isCorrect: boolean;
}