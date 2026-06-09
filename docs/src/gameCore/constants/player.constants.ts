import type { Race } from "@packages/types";

export const PLAYERS_RACES: Extract<
  Race,
  "demons" | "drows" | "undeads" | "chimeras" | "humans" | "elfs" | "wizards"
>[] = ["demons", "drows", "undeads", "chimeras", "humans", "elfs", "wizards"];
