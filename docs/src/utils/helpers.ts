/**
 * Генерує випадкове ціле число в діапазоні [min, max], включно.
 *
 * @param min - Мінімальне значення (включно)
 * @param max - Максимальне значення (включно)
 *
 * @returns - рандомне число в межах [min,max]
 *
 * @example
 * randomInit(2,6); // 4
 */
export function randomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (min > max) {
    [min, max] = [max, min];
  }

  if (min === max) return min;

  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const range = max - min + 1;
    const randomBuffer = new Uint32Array(1);
    crypto.getRandomValues(randomBuffer);
    return min + (randomBuffer[0] % range);
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
export function weightedRandom<T extends string | number>(
  weights: Record<T, number>
): T {
  const entries = Object.entries(weights) as [T, number][];

  const total = entries.reduce((sum, [, weight]) => sum + weight, 0);

  let rnd = Math.random() * total;

  for (const [value, weight] of entries) {
    if (rnd < weight) return value;
    rnd -= weight;
  }

  return entries[entries.length - 1][0];
}

/**
 * Генерує унікальний рядковий ідентифікатор.
 *
 * @param key - (необов'язково) префікс для групування ідентифікаторів,
 *              наприклад тип сутності: "unit", "ruin", "player".
 *              Якщо не вказано — буде використано тільки унікальна частина.
 *
 * @returns Унікальний ID формату:
 *          "<key>_<timestamp>_<hash>" або "<timestamp>_<hash>" якщо key не передано.
 *
 * @example
 * generateId("unit"); // "unit_1738445000112_f4a9e"
 *
 * @example
 * generateId(); // "1738445000112_f4a9e"
 */
export function generateId(key?: string): string {
  const unique = `${Date.now()}_${Math.random().toString(16).slice(2)}`;
  return key ? `${key}_${unique}` : unique;
}

/**
 * Запускає періодичне виконання callback з контролем одночасних викликів.
 * Якщо callback async і виконується довше за інтервал — наступний запуск чекатиме завершення.
 *
 * @param intervalMs - інтервал у мс між викликами
 * @param callback - функція, яку потрібно викликати (може бути async)
 * @param options - додаткові налаштування
 * @param options.returnStop - чи повертати функцію для зупинки (default: false)
 * @param options.immediate - чи запускати перший виклик одразу (default: true)
 *
 * @returns Функція stop() якщо returnStop=true, інакше нічого.
 *
 * @example
 * const stop = runControlledInterval(5000, async () => {
 *   await maintainRuins();
 * });
 *
 * // Зупинити через 30 сек
 * setTimeout(stop, 30000);
 */
export function runControlledInterval(
  intervalMs: number,
  callback: () => void | Promise<void>,
  options: { returnStop?: boolean; immediate?: boolean } = {}
): (() => void) | void {
  const { returnStop = true, immediate = true } = options;

  let active = false;
  let timerId: ReturnType<typeof setInterval> | null = null;

  async function runner() {
    if (active) return;
    active = true;
    try {
      await callback();
    } finally {
      active = false;
    }
  }

  if (immediate) {
    runner();
  }

  timerId = setInterval(runner, intervalMs);

  if (returnStop) {
    return () => {
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }
    };
  }
}

/**
 * Вибирає випадковий вільний індекс з діапазону [0, maxIndex], пропускаючи зайняті.
 *
 * @param {number[]} occupied - Масив зайнятих індексів.
 * @param {number} maxIndex - Максимальний індекс, який можна вибрати.
 * @returns {number | null} Випадковий вільний індекс або `null`, якщо всі індекси зайняті.
 *
 * @example
 * const occupied = [0, 2, 3];
 * const maxIndex = 4;
 * const freeIndex = getRandomFreeIndex(occupied, maxIndex);
 * freeIndex може бути 1 або 4
 */
export function getRandomFreeIndex(
  occupied: number[],
  maxIndex: number
): number | null {
  const occupiedSet = new Set(occupied);
  const freeIndices = [];

  for (let i = 0; i <= maxIndex - 1; i++) {
    if (!occupiedSet.has(i)) freeIndices.push(i);
  }

  if (freeIndices.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * freeIndices.length);
  return freeIndices[randomIndex];
}

/**
 * Додає або видаляє елемент з масиву, не змінюючи оригінальний масив.
 *
 * @template T - Тип елементів масиву.
 * @param {"add" | "remove"} action - Яку дію виконати.
 * @param {T} item - Елемент, який потрібно додати або видалити.
 * @param {T[]} array - Цільовий масив.
 * @returns {T[]} Новий масив із застосованими змінами.
 *
 * @example
 * manageItemInArrayByAction("add", 3, [1, 2]);        // → [1, 2, 3]
 * manageItemInArrayByAction("remove", 2, [1, 2, 3]);  // → [1, 3]
 * manageItemInArrayByAction("add", 1, [1, 2]);        // → [1, 2] (дублікати не додаються)
 */
export function manageItemInArrayByAction<T extends number | string>(
  action: "add" | "remove",
  item: T,
  array: T[]
): T[] {
  switch (action) {
    case "add":
      return array.includes(item) ? array : [...array, item];

    case "remove":
      return array.filter((i) => i !== item);

    default:
      return array;
  }
}
