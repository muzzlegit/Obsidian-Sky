import type { DomainLocation, Ruin } from '#/game/domain/game.public';

export type engineEvents = {
  // RUIN
  'ruin:spawned': { ruin: Ruin; location: DomainLocation };
  // "ruin:destroyed": { ruinId: Ruin["id"]; ruinLocation: Ruin["location"] };
  'ruin:expired': { ruinId: Ruin['id']; location: DomainLocation };
  // "ruin:removed": { ruinId: Ruin["id"]; ruinLocation: Ruin["location"] };
  // "ruin:discovered": Ruin["id"];
};
