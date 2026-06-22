import { transport } from '#/transport';
import { useGameUI } from './store/gameUI';

export const useKingdom = () => {
  const currentKingdomId = useGameUI((state) => state.currentKingdomId);

  const kingdoms = useGameUI.getState().kingdoms;

  const kingdomFields = transport.query.getKingdomFields(currentKingdomId);

  const coordinates = kingdoms.find((kingdom) => kingdom.id === currentKingdomId).coordinates;

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
    kingdomFields,
    coordinates,
    handleIncreaseCoordinate,
    handleDecreaseCoordinate,
  };
};
