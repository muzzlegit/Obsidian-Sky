import type { Player } from '#/game/domain/game.public';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { KingdomUI } from '../kingdom.types';

type RootStore = {
  player: Player | null;
  kingdoms: KingdomUI[];
  currentKingdomId: string;
};

export const useGameUI = create<RootStore>()(
  devtools(
    immer(() => ({
      player: null,
      kingdoms: [],
      currentKingdomId: '',
    })),
    {
      name: 'GAME_UI',
    },
  ),
);
export const selectGameUI = <T>(selector: (state: RootStore) => T): T =>
  selector(useGameUI.getState());
