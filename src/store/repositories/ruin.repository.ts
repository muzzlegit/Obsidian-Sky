import type { Ruin } from '#/game/game.types';
import { useGameStore } from '../gameStore';

export async function addRuinToStore(ruin: Ruin) {
  useGameStore.setState((state) => {
    state.ruins[ruin.id] = ruin;
  });
  return true;
}
