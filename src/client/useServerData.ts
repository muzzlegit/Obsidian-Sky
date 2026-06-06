import type { ServerData } from '#/server/server';
import { useGameUI } from './store/gameUI';

export const useServerData = (serverData: ServerData) => {
  if (!serverData) return;
  const { kingdoms, playerKingdomId } = serverData;
  useGameUI.setState({
    currentKingdomId: playerKingdomId,
    kingdoms,
  });
};
