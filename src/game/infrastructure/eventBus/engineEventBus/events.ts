import type { KingdomField, Ruin } from '#/game/domain/game.public';

export type engineEvents = {
  // RUIN
  'ruin:spawned': { ruin: Ruin; fieldId: KingdomField['id'] };
  // "ruin:destroyed": { ruinId: Ruin["id"]; ruinLocation: Ruin["location"] };
  // "ruin:expired": Ruin["id"];
  // "ruin:removed": { ruinId: Ruin["id"]; ruinLocation: Ruin["location"] };
  // "ruin:discovered": Ruin["id"];
};
