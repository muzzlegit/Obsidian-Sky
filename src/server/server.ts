import type { Kingdom, Player } from '#/game/domain/game.public';
import { worldSystem } from '#/game/domain/world/world.system';
import { useGameStore } from '#/store/gameStore';

export type ServerData = {
  player: Player;
  kingdoms: Kingdom['id'][];
};

export const startServer = (): ServerData => {
  const player = useGameStore.getState().player;
  const isCreated = useGameStore.getState().isCreated;
  const kingdomsData = useGameStore.getState().kingdoms;
  const gameStore = worldSystem.bootWorld(isCreated);
  if (gameStore) {
    useGameStore.setState((state) => ({ ...state, ...gameStore, isCreated: true }));
  }
  const kingdoms = Object.keys(kingdomsData);

  return {
    player: {
      ...player,
      capital: {
        ...player.capital,
        kingdomId: kingdoms[4]!,
      },
    },
    kingdoms,
  };
};
