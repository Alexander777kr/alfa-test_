import { Character } from "../../../utils/types";

export type CardProps = {
  character: Character;
  setEditCard: React.Dispatch<React.SetStateAction<boolean>>;
};