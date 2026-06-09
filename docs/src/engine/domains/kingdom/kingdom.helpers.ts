import {
  DARK_FRACTIONS,
  LIGHT_FRACTIONS,
  type Fraction,
  type Race,
} from "@engine/sharedBridge";

/**
 * Створює та повертає конфігураційний файл світу
 *
 * @returns конфігураційний файл світу
 *
 */
//TODO: ПОТРЕБУЄ ОНОВЛЕННЯ
// export function getInitialWorld(): World {
//   return ARCHON_CONFIG;
// }

/**
 * Перевіряє на расу Монстрів чи Монстрів Кланового Замку.
 *
 * @param race - раса (напр. "demons")
 *
 * @returns true, якщо раса є монстрами, інакше false
 *
 * @example
 * isMonsters("demons"); // false;
 * isMonsters("monsters"); // true
 */
export function isMonsters(race: Race): boolean {
  return race === "monsters" || race === "castleMonsters";
}

/**
 * Визначає фракцію по расі
 *
 * @param race - раса (напр. "demons")
 *
 * @returns фракцію або null якщо раса не налижить до жодної
 *
 * @example
 * determineFraction("elfs"); // light;
 * @example
 * determineFraction("demon"); // dark;
 * @example
 * determineFraction("monsters"); // null
 *
 */
export function determineFraction(race: Race): Fraction | null {
  if (DARK_FRACTIONS.includes(race)) return "dark";
  if (LIGHT_FRACTIONS.includes(race)) return "light";
  return null;
}
