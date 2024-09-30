
export type OriginAndLocation = {
  name: string;
  url: string;
};

export type Origin = OriginAndLocation;
export type Location = OriginAndLocation; 

export type Character = { 
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin | undefined;
  location: Location | undefined;
  image: string;
  episode: string[] | undefined;
  url: string;
  created: string;
  like: boolean; 
}


export type AddCharacter = {
  id: number; 
  name: string;
  status: string;
  species: string;
  gender: string;
  originName?: string;
  locationName?: string;
  image: string;
  episodes: string;
  episode?: string[];
  type: string;
  origin?: Origin;
  location?: Location;
  url?: string;
  created?: string;
  like?: boolean;
}

export type Status = 'idle' | 'loading' | 'succeeded' | 'failed';