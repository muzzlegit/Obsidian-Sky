import { game } from '#/game/game';
import { getRandomItem } from '#/shared/utils/getRandomItem';
import type { FieldDomainPlace, Kingdom, KingdomField } from './kingdom.types';

/**
 * Рахує кількість руїн для кожного королівства.
 *
 * Проходить по всіх королівствах у store, перевіряє їх поля
 * та підраховує кількість доменів типу `ruin`.
 *
 * @returns {Record<Kingdom['id'], number>}
 * Об'єкт, де ключ — id королівства, значення — кількість руїн.
 *
 * @example
 * {
 *   kingdom_1: 3,
 *   kingdom_2: 0,
 *   kingdom_3: 7,
 * }
 */
export async function getKingdomRuinsCountMap(): Promise<Record<Kingdom['id'], number>> {
  const kingdoms = await game.getKingdomsStore();
  const kingdomsFields = await game.getKingdomsFieldsStore();

  const result: Record<Kingdom['id'], number> = {} as Record<Kingdom['id'], number>;
  for (const kingdomId in kingdoms) {
    const kingdom = kingdoms[kingdomId as Kingdom['id']];
    result[kingdomId as Kingdom['id']] = 0;

    for (const fieldId of kingdom.fieldsIds) {
      const field = kingdomsFields[fieldId as KingdomField['id']];
      const domain = field?.domains.world;

      if (domain?.type === 'ruin') {
        result[kingdomId as Kingdom['id']]++;
      }
    }
  }
  return result;
}

export async function getRandomFreeKingdomFieldId(
  kingdomId: Kingdom['id'],
  layer: FieldDomainPlace,
) {
  const fields = await game.getKingdomFields(kingdomId);
  const freeFields = fields.filter((field) => !field.domains[layer]).map((field) => field.id);
  return getRandomItem(freeFields);
}
