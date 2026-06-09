import type { FieldLayer } from "./kingdom.types";
import type { Resources } from "./resource.types";
import type {
  DomainLocation,
  DomainType,
  Race,
  ServerId,
  Visibility,
} from "./server.types";
import type { Unit, UnitType } from "./unit.types";

export type RuinLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type RuinRace = Extract<Race, "monsters">;

export type RuinSquad = Partial<Record<UnitType, Unit>>;

export type Ruin = {
  id: ServerId;
  visible: Visibility;
  type: DomainType;
  place: FieldLayer;
  level: RuinLevel;
  race: RuinRace;
  lifeTime: number;
  obsidian: number;
  squad: RuinSquad;
  resources: Resources;
  location?: DomainLocation;
  isHero?: boolean;
  heroType?: "1" | "2";
};

// TODO визначити heroType
export type AggressiveRuin = Ruin & {};

export type RuinUI = {
  id: Ruin["id"];
  level: Ruin["level"];
  type: Ruin["type"];
  isHero?: Ruin["isHero"];
};
