import type { PLAYERS_RACES } from "../constants";
import type { Obsidian, Resource } from "./resource.types";
import type { Fraction } from "./server.types";

export type Player = {
  name: string;
  race: PlayerRace;
  fraction: Fraction;
  obsidian: Obsidian;
  recources: Record<Resource, number>;
  capital: {
    id: string;
    name: string;
    x: number;
    y: number;
  };
};
export type PlayerRace = (typeof PLAYERS_RACES)[number];
