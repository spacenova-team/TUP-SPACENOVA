export interface IAsteroids {
  name: string;
  minDiameter: number;
  maxDiameter: number;
  hazardous: boolean;
  approachDate: Date | string;
  velocity: number;
  orbitingBody: string;
}

export interface ILocalStorageData {
  data: IAsteroids[];
  timestamp: number;
}

export interface INasaCloseApproach {
  close_approach_date_full: string;
  relative_velocity: { kilometers_per_hour: string };
  orbiting_body: string;
}

export interface INasaAsteroidRaw {
  name: string;
  estimated_diameter: {
    meters: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: INasaCloseApproach[];
}

export interface INasaApiResponse {
  near_earth_objects: Record<string, INasaAsteroidRaw[]>;
}
