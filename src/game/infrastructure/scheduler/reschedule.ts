import { EVENT_BUS } from '../eventBus/eventBus';
import type { RuinTaskPayload, Task, TaskType } from './scheduler.types';

export const TaskHandlers: Partial<Record<keyof TaskType, (payload: Task['payload']) => void>> = {
  'ruin:expired': (payload: RuinTaskPayload) => {
    EVENT_BUS.emit('ruin:expired', payload);
  },
};
