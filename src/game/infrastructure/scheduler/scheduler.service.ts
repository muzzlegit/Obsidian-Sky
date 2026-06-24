import { useGameStore } from '#/store/gameStore';
import type { SchedulerItem } from './scheduler.types';

function getSchedulerStore(): SchedulerItem[] {
  return useGameStore.getState().scheduler;
}

export const schedulerService = {
  getSchedulerStore,
};
