import { select } from '#/store/gameStore';
import { selectGameUI, useGameUI } from './store/gameUI';
import { findInMatrix } from '#/shared/utils/findInMatrix';

export const useKingdom = () => {
  const currentKingdomId = useGameUI((state) => state.currentKingdomId);
  const kingdoms = selectGameUI((state) => state.kingdoms);
  const kingdom = select((state) => state.kingdoms[currentKingdomId]);
  const coordinates = findInMatrix(kingdoms, currentKingdomId) ?? { col: 0, row: 0 };

  console.log(currentKingdomId, kingdom);

  const handleIncreaseCoordinate = (key: 'col' | 'row') => {
    if (!key) return;
    if (key === 'col') {
      useGameUI.setState({ currentKingdomId: kingdoms[coordinates?.row][coordinates?.col + 1] });
    }
    if (key === 'row') {
      useGameUI.setState({ currentKingdomId: kingdoms[coordinates?.row + 1][coordinates?.col] });
    }
  };

  const handleDecreaseCoordinate = (key: 'col' | 'row') => {
    if (!key) return;
    if (key === 'col') {
      useGameUI.setState({ currentKingdomId: kingdoms[coordinates?.row][coordinates?.col - 1] });
    }
    if (key === 'row') {
      useGameUI.setState({ currentKingdomId: kingdoms[coordinates?.row - 1][coordinates?.col] });
    }
  };
  return { kingdom, coordinates, handleIncreaseCoordinate, handleDecreaseCoordinate };
};
