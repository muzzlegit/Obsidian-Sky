/**
 * Повертає випадковий елемент з масиву.
 *
 * @param items - масив елементів
 * @returns випадковий елемент або undefined, якщо масив порожній
 */
export function getRandomItem<T>(items: T[]): T | undefined {
  if (items.length === 0) {
    return undefined;
  }

  return items[Math.floor(Math.random() * items.length)];
}
