import { Character, Status } from "../../utils/types";

export type CharacterInfoState = {
  characterInfo: Character;
  status: Status;
  error: string | null;
};