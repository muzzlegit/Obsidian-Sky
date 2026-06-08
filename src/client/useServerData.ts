import type { ServerData } from '#/server/server';
import type { KingdomUI } from './kingdom.types';
import { useGameUI } from './store/gameUI';

export const useServerData = (serverData: ServerData) => {
  if (!serverData) return;
  const { kingdoms, playerKingdomId } = serverData;
  useGameUI.setState({
    currentKingdomId: playerKingdomId,
    kingdoms: generateCoordinates(kingdoms, 3),
  });
};

/**
 * Генерує координати для елементів, ніби вони розкладені в матрицю.
 * Координати починаються з 1, а не з 0.
 *
 * @param items - Масив ідентифікаторів
 * @param columns - Кількість колонок у матриці
 * @returns Масив об'єктів { id, coordinates:{x, y} }
 */
export function generateCoordinates(items: string[], columns: number): KingdomUI[] {
  return items.map((id, index) => ({
    id,
    coordinates: {
      x: (index % columns) + 1,
      y: Math.floor(index / columns) + 1,
    },
  }));
}
