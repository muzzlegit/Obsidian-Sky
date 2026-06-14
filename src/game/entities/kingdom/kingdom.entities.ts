import { game } from '#/game/game';
import type { Domain, KingdomField } from './kingdom.types';

export async function addDomainToKingdom(kingdomFieldId: KingdomField['id'], domain: Domain) {
  const layer = {
    ruin: 'world',
  };
  const field = await game.getKingdomFiled(kingdomFieldId);
  if (!field) {
    console.debug('[WARN][GAME][addDomainToKingdom]:Kingdom field not found');
    return;
  }
  const { domains, ...rest } = field;
  const updatedField = { ...rest, domains: { ...domains, [layer[domain.type]]: domain } };
  const result = await game.setField(updatedField);
  if (result) {
    console.debug(`[SUCCES][GAME][addDomainToKingdom]:${domain.type} added to field ${field.id}`);
  } else {
    console.debug(`[WARN][GAME][addDomainToKingdom]:${domain.type} not added to field ${field.id}`);
  }
}
