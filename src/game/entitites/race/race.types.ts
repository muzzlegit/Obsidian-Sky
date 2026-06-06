import type { PLAYER_AVAILABLE_RACES, RACES } from "./race.constants";

export type Race = (typeof RACES)[number];

export type PlayerRace = (typeof PLAYER_AVAILABLE_RACES)[number];

export type Fraction = "dark" | "light";
