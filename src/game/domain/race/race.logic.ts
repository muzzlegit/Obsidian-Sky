import { RACE_TO_FRACTION } from "./race.constants";
import type { Fraction, PlayerRace } from "./race.types";

/**
 * Повертає фракцію ("light" | "dark") виходячи з заданої раси
 *
 * @param race - раса гравця
 * @returns фракцію яка відповідає расі
 *
 * @example
 * getFractionByRace("demons") // "dark"
 * getFractionByRace("humans") // "light"
 */
export function getFractionByRace(race: PlayerRace): Fraction {
  return RACE_TO_FRACTION[race];
}
