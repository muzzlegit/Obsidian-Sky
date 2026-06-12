import { getRandomItem } from '#/shared/utils/getRandomItem';
import { useGameStore } from '#/store/gameStore';
import type { WorldKingdoms } from '../world/world.types';
import type { FieldDomainPlace, Kingdom, KingdomField, KingdomFields } from './kingdom.types';

/**
 *
 */
export function getKingdoms(): WorldKingdoms {
  return useGameStore.getState().kingdoms;
}

/**
 *
 */
export function getKingdomsIds() {
  return Object.keys(useGameStore.getState().kingdoms);
}

// export function getKingdomById(kingdomId: Kingdom['id']): Kingdom {
//   return useGameStore.getState().kingdoms[kingdomId];
// }

export function getKingdomsFieldsStore() {
  return useGameStore.getState().kingdomsFields;
}

/**
 * Повертає дані полів королівства
 *
 * @param  {Kingdom["id"]} kingdomId  - id королівства
 *
 * @returns {KingdomFields[]} - масив з даними полів королівства
 *
 * @see useGameStore
 */
export function getKingdomFieldsIds(kingdomId: Kingdom['id']): KingdomField['id'][] {
  return useGameStore.getState().kingdoms[kingdomId].fieldsIds;
}

/**
 * Повертає дані полів королівства
 *
 * @param  {Kingdom["id"]} kingdomId  - id королівства
 *
 * @returns {KingdomFields[]} - масив з даними полів королівства
 *
 * @see useGameStore
 */
export function getKingdomFields(kingdomId: Kingdom['id']): KingdomField[] {
  const { kingdoms, kingdomsFields } = useGameStore.getState();
  return kingdoms[kingdomId].fieldsIds.map((fieldId) => kingdomsFields[fieldId]).filter(Boolean);
}

// /**
//  * Рахує і повертає кількість руїн в королівстві
//  *
//  * @param  {Kingdom["id"]} kingdomId  - id королівства
//  *
//  * @returns {number} - кількість руїн
//  *
//  * @see getKingdomFields
//  */
// export function getKingdomRuinsCount(kingdomId: Kingdom['id']): number {
//   return getKingdomFields(kingdomId).reduce<number>((acc, field) => {
//     const domain = field.domains.world;
//     if (domain && domain.type === 'ruin') acc += 1;
//     return acc;
//   }, 0);
// }

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
export function getKingdomRuinsCountMap(): Record<Kingdom['id'], number> {
  const { kingdoms, kingdomsFields } = useGameStore.getState();

  const result: Record<Kingdom['id'], number> = {} as Record<Kingdom['id'], number>;

  Object.entries(kingdoms).forEach(([kingdomId, kingdom]) => {
    const { fieldsIds } = kingdom;
    result[kingdomId] = 0;
    fieldsIds.forEach((fieldId) => {
      const domain = kingdomsFields[fieldId].domains.world;
      if (domain && domain.type === 'ruin') {
        result[kingdomId] = result[kingdomId] + 1;
      }
    });
  });
  return result;
}

export function getRandomFreeKingdomFieldId(kingdomId: Kingdom['id'], layer: FieldDomainPlace) {
  const fields = getKingdomFields(kingdomId);
  const freeFields = fields.filter((field) => !field.domains[layer]).map((field) => field.id);
  return getRandomItem(freeFields);
}
