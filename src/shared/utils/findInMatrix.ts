type Coord = { row: number; col: number };

/**
 * Знаходить перше входження елемента в двовимірному масиві.
 *
 * @param matrix - Двовимірний масив рядків
 * @param target - Рядок, який потрібно знайти
 * @returns Координати {row, col} якщо знайдено, або null якщо елемент відсутній
 */
export function findInMatrix(matrix: string[][], target: string): Coord | null {
  for (let row = 0; row < matrix.length; row++) {
    const col = matrix[row].indexOf(target);

    if (col !== -1) {
      return { row, col };
    }
  }

  return null;
}
