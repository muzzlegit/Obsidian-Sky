import type { Kingdom } from '#/game/game.public';
import { useGameStore } from '../gameStore';

function getKingdomById(kingdomId: Kingdom['id']): Kingdom {
  return useGameStore((state) => state.kingdoms[kingdomId]);
}

export const kingdomQuery = {
  getKingdomById,
};
