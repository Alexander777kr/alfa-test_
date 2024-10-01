import { MAX_TEXT_LENGTH } from "./constants";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const apiEpisode = import.meta.env.VITE_API_EPISODE;

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
  const urls = numbers.map(num => `${baseUrl}${apiEpisode}/${num}`);
  return urls;
}

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}