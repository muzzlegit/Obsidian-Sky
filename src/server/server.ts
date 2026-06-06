import type { Kingdom } from '#/game/entitites/kingdom/kingdom.types';
import { worldSystem } from '#/game/entitites/world/world.system';
import { toMatrix } from '#/shared/utils/toMatrix';
import { select, useGameStore } from '#/store/gameStore';

export type ServerData = {
  kingdoms: Kingdom['id'][][];
  playerKingdomId: Kingdom['id'];
};

export const startServer = (): ServerData => {
  const isCreated = select((state) => state.isCreated);
  const gameStore = worldSystem.bootWorld(isCreated);
  if (gameStore) {
    useGameStore.setState((state) => ({ ...state, ...gameStore, isCreated: true }));
  }
  const kingdoms = Object.keys(select((state) => state.kingdoms));
  return {
    kingdoms: toMatrix(kingdoms, 3),
    playerKingdomId: Object.keys(select((state) => state.kingdoms))[0],
  };
};
