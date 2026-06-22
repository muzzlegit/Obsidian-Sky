import type { Kingdom, KingdomField, WorldKingdoms } from '#/game/domain/game.public';
import { kingdomService } from '#/game/domain/kingdom/kingdom.service';

function getKingdomsIds(): WorldKingdoms {
  return kingdomService.getKingdomsStore();
}

function getKingdomFields(kingdomId: Kingdom['id']): Omit<KingdomField, 'kingdomId'>[] {
  return kingdomService.getKingdomFields(kingdomId).map(({ kingdomId, ...rest }) => rest);
}

export const queries = {
  getKingdomsIds,

  getKingdomFields,
};
