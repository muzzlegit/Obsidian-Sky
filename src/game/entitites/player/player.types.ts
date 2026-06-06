import type { Fraction, PlayerRace } from '#game/entitites/race/race.types';
import type { Obsidian } from '#game/entitites/obsidian/obsidian.types';
import type { Resources } from '#game/entitites/resource/resource.types';

export type Player = {
  id: string;
  name: string;
  race: PlayerRace;
  fraction: Fraction;
  obsidian: Obsidian;
  recources: Resources;
  // capital: {
  //   id: string;
  //   name: string;
  //   x: number;
  //   y: number;
  // };
};
