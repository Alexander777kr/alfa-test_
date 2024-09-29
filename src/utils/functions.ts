import { MAX_TEXT_LENGTH } from "./constants";

export function truncateText(text: string, maxLength: number = MAX_TEXT_LENGTH): string {
 
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  
  return text;
}

export function showEpisodes(episodesArray: string[]) {
  const numbers = episodesArray.map((url: string) => {
    const match = url.match(/(\d+)$/);
    return match ? match[1] : null;
}).filter((num: string | null) => num !== null); 

// Объединение чисел в строку через запятую
return numbers.join(', ');
}