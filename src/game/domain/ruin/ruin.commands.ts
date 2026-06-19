import { useGameStore } from '#/store/gameStore';
import type { Ruin } from '../ruin/ruin.types';

export function addRuinToStore(ruin: Ruin) {
  useGameStore.setState((state) => {
    state.ruins[ruin.id] = ruin;
  });
}

export function removeRuinFromStore(ruinId: Ruin['id']) {
  useGameStore.setState((state) => {
    delete state.ruins[ruinId];
  });
}
