import type { Race } from '../race/race.types';
import type { Resources } from '../resource/resource.types';
import type { Unit, UnitType } from '../unit/unit.types';

export type RuinLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type RuinRace = Extract<Race, 'monsters'>;

export type RuinSquad = Partial<Record<UnitType, Unit>>;

export type Ruin = {
  id: string;
  type: 'ruin';
  behavior: 'common' | 'aggressive';
  level: RuinLevel;
  race: RuinRace;
  lifeTime: number;
  obsidian: number;
  squad: RuinSquad;
  resources: Resources;
  isHero?: boolean;
  heroType?: '1' | '2';
};

export type RuinsStore = Record<Ruin['id'], Ruin>;
 