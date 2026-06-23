import type { DomainLocation, Ruin } from '#/game/domain/game.public';

export type SchedulerItem = {
  expiresAt: number;
  payload: RuinSchedulerPayload;
};

export type RuinSchedulerPayload = {
  id: Ruin['id'];
  location: DomainLocation;
};
