import type { Kingdom, KingdomField, WorldKingdoms } from '#/game/domain/game.public';

export interface Queries {
  getKingdomsIds: {
    request: undefined;
    response: WorldKingdoms;
  };
  getKingdomFields: {
    request: Kingdom['id'];
    response: Omit<KingdomField, 'kingdomId'>[];
  };
}
