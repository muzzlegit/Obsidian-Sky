import { useGameStore } from '#/store/gameStore';
import type { Ruin } from '../domain/game.public';

function addRuinToStore(ruin: Ruin) {
  useGameStore.setState((state) => {
    state.ruins[ruin.id] = ruin;
  });
}

function removeRuinFromStore(ruinId: Ruin['id']) {
  useGameStore.setState((state) => {
    delete state.ruins[ruinId];
  });
}

export const ruinService = {
  addRuinToStore,
  removeRuinFromStore,
};
