import type { RACES } from "../constants";
import type { Ruin, RuinUI } from "./ruin.types";

export type DomainType = "ruin" | "aggressiveRuin";
export type DomainLocation = {
  kingdomIndex: number;
  fieldIndex: number;
};
export type DomainLifeTime = number;
export type DomainId = ServerId;

export type Domain = Ruin;

export type TimedDomain = { id: DomainId; type: DomainType; expiresAt: number };

export type Fraction = "dark" | "light" | null;

export type Race = (typeof RACES)[number];

export type Visibility = boolean;

export type ServerId = string;

// ================ UI =================

export type DomainUI = RuinUI;
