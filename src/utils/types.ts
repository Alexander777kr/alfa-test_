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
  origin: Location | undefined;
  location: Location | undefined;
  image: string;
  episode: string[] | undefined;
  url: string;
  created: string;
  like: boolean; 
}

export type Status = 'idle' | 'loading' | 'succeeded' | 'failed';