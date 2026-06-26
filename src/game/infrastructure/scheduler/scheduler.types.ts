import type { DomainLocation, Ruin } from '#/game/domain/game.public';
import type { engineEvents } from '../eventBus/events/events';

export type TaskType = keyof engineEvents;

export type SchedulerTask = {
  id: string;
  expiresAt: number;
  type: TaskType;
  payload: RuinTaskPayload;
};

export type RuinTaskPayload = {
  ruinId: Ruin['id'];
  location: DomainLocation;
};
