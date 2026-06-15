import type {
  KingdomFields,
  Player,
  RuinsStore,
  TimedDomain,
  WorldKingdoms,
} from '#/game/domain/game.public';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
// TYPES

export type RootStore = {
  isCreated: boolean;
  player: Player | null;
  kingdoms: WorldKingdoms;
  kingdomsFields: KingdomFields;
  ruins: RuinsStore;
  timedDomains: TimedDomain[];
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
        ruins: {},
        timedDomains: [],
      })),
      {
        name: 'GAME_DB',
        storage: createJSONStorage(() => localStorage),

        partialize: (state) => ({
          isCreated: state.isCreated,
          player: state.player,
          kingdoms: state.kingdoms,
          kingdomsFields: state.kingdomsFields,
          ruins: state.ruins,
          timedDomains: state.timedDomains,
        }),
      },
    ),
  ),
);
