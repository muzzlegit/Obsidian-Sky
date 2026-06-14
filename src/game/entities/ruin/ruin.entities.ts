import { useGameStore } from '#/store/gameStore';
import type { Ruin } from './ruin.types';

export function addRuinToStore(ruin: Ruin) {
  useGameStore.setState((state) => {
    state.ruins[ruin.id] = ruin;
  });
}
