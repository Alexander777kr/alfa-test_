export type Location = {
  name: string;
  url: string;
};

export type Character = { 
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
  like: boolean; 
}

export type CharactersArray = Character[];

export type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

type Info = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

export type CharactersApiReceivedState = {
  info: Info;
  results: CharactersArray;
};

export type CharactersState = {
  characters: CharactersArray;
  status: Status;
  error: string | null;
};