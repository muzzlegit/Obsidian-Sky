import type { Kingdom } from '#/game/domain/game.public';
import { worldSystem } from '#/game/domain/world/world.system';
import { useGameStore } from '#/store/gameStore';

export type ServerData = {
  kingdoms: Kingdom['id'][];
  playerKingdomId: Kingdom['id'];
};

export const startServer = (): ServerData => {
  const isCreated = useGameStore.getState().isCreated;
  const kingdomsData = useGameStore.getState().kingdoms;
  const gameStore = worldSystem.bootWorld(isCreated);
  if (gameStore) {
    useGameStore.setState((state) => ({ ...state, ...gameStore, isCreated: true }));
  }
  const kingdoms = Object.keys(kingdomsData);

  return {
    kingdoms,
    playerKingdomId: kingdoms[4]!,
  };
};
