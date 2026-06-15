import { useGameStore } from '#/store/gameStore';
import type { Ruin } from './ruin.types';

function addRuinToStore(ruin: Ruin) {
  useGameStore.setState((state) => {
    state.ruins[ruin.id] = ruin;
  });
}

export const ruinService = {
  addRuinToStore,
};
