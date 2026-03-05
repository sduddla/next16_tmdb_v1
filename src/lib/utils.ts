import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMinutesToHourMin(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);
  return `${hours}h ${minutes}m`;
}

export function pickMainVideo(videos: TMDBVideo[]) {
  return (
    videos.find((v) => v.type === 'Trailer' && v.official) ??
    videos.find((V) => V.type === 'Trailer') ??
    videos.find((v) => v.official) ??
    videos[0] ??
    null
  );
}

export function categoryName(category: string) {
  if (category === 'upcoming') return '개봉예정';
  else if (category === 'popular') return '인기작';
  else if (category === 'now_playing') return '상영중';
}
