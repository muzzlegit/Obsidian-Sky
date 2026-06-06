import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
// TYPES
import type { KingdomFields } from '#/game/entitites/kingdom/kingdom.types';
import type { Player } from '#/game/entitites/player/player.types';
import type { WorldKingdoms } from '#/game/entitites/world/world.types';

export type RootStore = {
  isCreated: boolean;
  player: Player | null;
  kingdoms: WorldKingdoms;
  kingdomsFields: KingdomFields;
};
export const useGameStore = create<RootStore>()(
  devtools(
    persist(
      immer(() => ({
        isCreated: false,
        player: {
          id: '212',
          obsidian: 1000,
          race: 'drows',
          fraction: 'dark',
          name: 'muzzle',
          recources: {
            gold: 100,
            wood: 100,
            stone: 100,
            grain: 100,
            iron: 100,
            population: 500,
          },
        },
        kingdoms: {},
        kingdomsFields: {},
      })),
      {
        name: 'GAME_DB',
        storage: createJSONStorage(() => localStorage),

        partialize: (state) => ({
          isCreated: state.isCreated,
          player: state.player,
          kingdoms: state.kingdoms,
          kingdomsFields: state.kingdomsFields,
        }),
      },
    ),
  ),
);
export const select = <T>(selector: (state: RootStore) => T): T =>
  selector(useGameStore.getState());
