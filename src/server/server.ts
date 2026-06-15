import type { Kingdom } from '#/game/domain/game.public';
import { worldSystem } from '#/game/domain/world/world.system';
import { registerGameEvents } from '#/game/infrastructure/eventBus/engineEventBus/subscriptions';
import { ruinSpawnSystem } from '#/game/systems/ruinSpawnSystem';
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
  registerGameEvents();
  ruinSpawnSystem();
  return {
    kingdoms,
    playerKingdomId: kingdoms[4]!,
  };
};
