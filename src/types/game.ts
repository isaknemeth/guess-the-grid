export interface CountryData {
  name: string;
  latitude: number;
  longitude: number;
  energyMix: {
    Hydro?: number;
    Wind?: number;
    Nuclear?: number;
    Solar?: number;
    Other_Renewables?: number;
    Oil?: number;
    Gas?: number;
    Coal?: number;
    Biofuel?: number;
  };
}

export interface GuessResult {
  country: string;
  distance: number;
  direction: string;
  isCorrect: boolean;
}