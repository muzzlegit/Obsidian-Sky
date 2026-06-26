import { EVENT_BUS } from '../eventBus/eventBus';
import type { RuinTaskPayload, SchedulerTask, TaskType } from './scheduler.types';

export const taskHandlers: Partial<Record<TaskType, (payload: SchedulerTask['payload']) => void>> =
  {
    'ruin:expired': (payload: RuinTaskPayload) => {
      EVENT_BUS.emit('ruin:expired', payload);
    },
  };
