import { MAX_TEXT_LENGTH } from "./constants";

export function truncateText(text: string  | undefined, maxLength: number = MAX_TEXT_LENGTH): string | undefined {
  if (text === undefined) {
    return;
  }
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

return numbers.join(', ');
}

export function episodesNumberArrayToUrls(series: string) {
  const numbers = Array.from(new Set(series.split(',')
  .map(num => parseInt(num.trim(), 10))))
  .sort((a, b) => a - b);
  const urls = numbers.map(num => `https://rickandmortyapi.com/api/episode/${num}`);
  return urls;
}

export function fromUuidToUniqueNumber(uuid: string) {
  let numberString = '';

  for (const char of uuid) {
    if (/\d/.test(char)) {
      numberString += char;
    }
  }
  return numberString ? parseInt(numberString, 10) : 0;
}