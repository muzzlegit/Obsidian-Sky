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

  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const range = max - min + 1;
    const randomBuffer = new Uint32Array(1);
    crypto.getRandomValues(randomBuffer);
    return min + (randomBuffer[0] % range);
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
