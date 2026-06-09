import type { Race } from "@packages/types";

// Список рас в грі
export const RACES = [
  "demons",
  "drows",
  "undeads",
  "chimeras",
  "humans",
  "elfs",
  "wizards",
  "monsters",
  "castleMonsters",
] as const;

// Фракції
export const DARK_FRACTIONS: Partial<Race[]> = [
  "demons",
  "drows",
  "undeads",
  "chimeras",
];
export const LIGHT_FRACTIONS: Partial<Race[]> = ["humans", "elfs", "wizards"];
