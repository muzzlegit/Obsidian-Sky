import type { Kingdom } from '#/game/entities/kingdom/kingdom.types';
import { worldSystem } from '#/game/entities/world/world.system';
import { ruinSpawnSystem } from '#/game/systems/ruinSpawnSystem';
import { select, useGameStore } from '#/store/gameStore';

export type ServerData = {
  kingdoms: Kingdom['id'][];
  playerKingdomId: Kingdom['id'];
};

export const startServer = async (): Promise<ServerData> => {
  const isCreated = select((state) => state.isCreated);
  const gameStore = worldSystem.bootWorld(isCreated);
  if (gameStore) {
    useGameStore.setState((state) => ({ ...state, ...gameStore, isCreated: true }));
  }
  const kingdoms = Object.keys(select((state) => state.kingdoms));

  await ruinSpawnSystem();
  return {
    kingdoms,
    playerKingdomId: kingdoms[4],
  };
};
