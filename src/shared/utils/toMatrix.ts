export function toMatrix<T>(items: T[], columns: number): T[][] {
  const matrix: T[][] = [];

  for (let i = 0; i < items.length; i += columns) {
    matrix.push(items.slice(i, i + columns));
  }

  return matrix;
}
