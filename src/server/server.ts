import type { Kingdom } from '#/game/entitites/kingdom/kingdom.types';
import { worldSystem } from '#/game/entitites/world/world.system';
import { ruinSpawnSystem } from '#/game/systems/ruinSpawnSystem';
import { select, useGameStore } from '#/store/gameStore';

export type ServerData = {
  kingdoms: Kingdom['id'][];
  playerKingdomId: Kingdom['id'];
};

export const startServer = (): ServerData => {
  const isCreated = select((state) => state.isCreated);
  const gameStore = worldSystem.bootWorld(isCreated);
  if (gameStore) {
    useGameStore.setState((state) => ({ ...state, ...gameStore, isCreated: true }));
  }
  const kingdoms = Object.keys(select((state) => state.kingdoms));

  ruinSpawnSystem();
  return {
    kingdoms,
    playerKingdomId: kingdoms[4],
  };
};
