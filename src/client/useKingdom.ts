import { kingdomQuery } from '#/store/queries/kingdom.query';
import { selectGameUI, useGameUI } from './store/gameUI';

export const useKingdom = () => {
  const currentKingdomId = useGameUI((state) => state.currentKingdomId);

  const kingdoms = selectGameUI((state) => state.kingdoms);

  const kingdom = kingdomQuery.getKingdomById(currentKingdomId);

  const coordinates = kingdoms.find((kingdom) => kingdom.id === currentKingdomId).coordinates;

  console.log(coordinates);
  const handleIncreaseCoordinate = (key: 'x' | 'y') => {
    const nextCoordinates = {
      ...coordinates,
      [key]: coordinates[key] + 1,
    };

    const nextKingdom = kingdoms.find(
      (kingdom) =>
        kingdom.coordinates.x === nextCoordinates.x && kingdom.coordinates.y === nextCoordinates.y,
    );

    if (!nextKingdom) return;

    useGameUI.setState({
      currentKingdomId: nextKingdom.id,
    });
  };

  const handleDecreaseCoordinate = (key: 'x' | 'y') => {
    const nextCoordinates = {
      ...coordinates,
      [key]: coordinates[key] - 1,
    };

    const nextKingdom = kingdoms.find(
      (kingdom) =>
        kingdom.coordinates.x === nextCoordinates.x && kingdom.coordinates.y === nextCoordinates.y,
    );

    if (!nextKingdom) return;

    useGameUI.setState({
      currentKingdomId: nextKingdom.id,
    });
  };

  return {
    kingdom,
    coordinates,
    handleIncreaseCoordinate,
    handleDecreaseCoordinate,
  };
};
