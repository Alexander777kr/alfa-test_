import { Character, Status } from "./charactersTypes";

export type CharacterInfoState = {
  characterInfo: Partial<Character>;
  status: Status;
  error: string | null;
};