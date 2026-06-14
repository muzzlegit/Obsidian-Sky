import type { Fraction, Race } from './race.types';

// РАСИ
export const RACES = [
  'demons',
  'drows',
  'undeads',
  'chimeras',
  'humans',
  'elfs',
  'wizards',
  'monsters',
  'castleMonsters',
] as const;

export const PLAYER_AVAILABLE_RACES = [
  'demons',
  'drows',
  'undeads',
  'chimeras',
  'humans',
  'elfs',
  'wizards',
] as const;

// ФРАКЦІЇ
export const RACE_TO_FRACTION: Record<Race[number], Fraction> = {
  demons: 'dark',
  drows: 'dark',
  undeads: 'dark',
  chimeras: 'dark',

  humans: 'light',
  elfs: 'light',
  wizards: 'light',
};
