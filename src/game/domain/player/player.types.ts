import type { Kingdom } from '../game.public';
import type { Obsidian } from '../obsidian/obsidian.types';
import type { Fraction, PlayerRace } from '../race/race.types';
import type { Resources } from '../resource/resource.types';

export type Player = {
  id: string;
  name: string;
  race: PlayerRace;
  fraction: Fraction;
  obsidian: Obsidian;
  citiesIds: [];
};
