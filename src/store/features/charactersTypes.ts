import { Character, Status } from "../../utils/types";

export type CharactersArray = Character[];

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

export type Pagination = {
  "count": number;
   "pages": number;
   "next": string | null;
   "prev": string | null;
};

export type CharactersState = {
  characters: CharactersArray;
  status: Status;
  error: string | null;
  pagination: Pagination;
};