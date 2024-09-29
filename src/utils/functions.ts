import { MAX_TEXT_LENGTH } from "./constants";

export function truncateText(text: string, maxLength: number = MAX_TEXT_LENGTH): string {
 
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  
  return text;
}