import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type RootStore = {
  kingdoms: string[][];
  currentKingdomId: string;
};
export const useGameUI = create<RootStore>()(
  devtools(
    immer(() => ({
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
