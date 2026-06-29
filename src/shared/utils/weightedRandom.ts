/**
 * Обирає випадкове значення на основі ваг (шанси у відсотках).
 *
 * @template T
 *
 * @param {Record<T, number>} weights
 * Об’єкт, де ключ — можливий результат, а значення — його шанс випадіння (у відсотках).
 * Сума шансів може бути будь-якою (не обов’язково 100) — вони будуть нормалізовані.
 *
 * @returns {T}
 * Значення, обране відповідно до заданих ваг.
 *
 * @example
 * // Для лут-дропа артефактів
 * const artifact = weightedRandom({
 *   1: 30,  // 30% шанс на артефакт 1 рівня
 *   2: 25,  // 25% на 2 рівень
 *   3: 20,  // 20% на 3 рівень
 *   4: 10,  // 10% на 4 рівень
 *   5: 5,   // 5% на 5 рівень
 *   none: 10 // 10% що нічого не випаде
 * });
 *
 * console.log(artifact);
 * // Може повернути: 1 | 2 | 3 | 4 | 5 | "none"
 *
 * @example
 * // Для вибору NPC з різною ймовірністю
 * const npc = weightedRandom({
 *   villager: 60,
 *   merchant: 30,
 *   hero: 10,
 * });
 *
 * @note
 * Кожен виклик функції є незалежним.
 */
export function weightedRandom<T extends string | number>(weights: Record<T, number>): T {
  const entries = Object.entries(weights) as [T, number][];

  const total = entries.reduce((sum, [, weight]) => sum + weight, 0);

  let rnd = Math.random() * total;

  for (const [value, weight] of entries) {
    if (rnd < weight) return value;
    rnd -= weight;
  }

  return entries[entries.length - 1][0];
}
