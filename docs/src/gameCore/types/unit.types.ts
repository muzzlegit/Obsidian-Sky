import type { UNIT_TYPES_LIST } from "../constants";
import type { Fraction, Race, ServerId } from "./server.types";

export type UnitType = (typeof UNIT_TYPES_LIST)[number];
export type UnitLevel = 1 | 2 | 3 | 4;
export type UnitRace = Race;

export type Unit = {
  name: ServerId;
  type: UnitType;
  level: UnitLevel;
  race: UnitRace;
  fraction: Fraction;
  quantity: number;
  attack: string;
  attackMax: number;
  attackMin: number;
  health: number;
  defense: number;
  defenseLimit: number;
  capacity?: number;
  resurrection?: number;
  suppression?: number;
  towersSuppression?: number;

  attackMultiplier: number;
  healthMultiplier: number;

  capacityMultiplier?: number;
  persecutionMultiplier?: number;
  terrainModification?: number;
  perfectResurrection?: number;
  additionalResurrection?: number;
  resurrectionMultiplier?: number;
  resurrectionLimit?: number;
  finishingOff?: number;
  roundAttackMultiplier?: number;
  towersSuppressionMultiplier?: number;
};

export type UnitRawData = {
  name: string[];
  attackMin: number[];
  attackMax: number[];
  health: number[];
  capacity?: number[];
  resurrection?: number[];
  towersSuppression?: number[];
};
