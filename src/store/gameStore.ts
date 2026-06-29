import type { KingdomFields, Player, RuinsStore, WorldKingdoms } from '#/game/domain/game.public';
import type { SchedulerTask } from '#/game/infrastructure/scheduler/scheduler.types';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// ! MOCS
const TEST_PLAYER: Player = {
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
  capital: {
    kingdomId: '',
    name: 'Grey Havens',
  },
};

// TYPES
export type RootStore = {
  isCreated: boolean;
  player: Player | null;
  kingdoms: WorldKingdoms;
  kingdomsFields: KingdomFields;
  ruins: RuinsStore;
  scheduler: SchedulerTask[];
};

export const useGameStore = create<RootStore>()(
  devtools(
    persist(
      immer(() => ({
        isCreated: false,
        player: TEST_PLAYER,
        kingdoms: {},
        kingdomsFields: {},
        ruins: {},
        scheduler: [],
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
          scheduler: state.scheduler,
        }),
      },
    ),
  ),
);
