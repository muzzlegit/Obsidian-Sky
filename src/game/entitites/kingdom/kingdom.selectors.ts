import { useGameStore } from '#/store/gameStore';
import type { Kingdom, KingdomField, KingdomFields } from './kingdom.types';

export const getKingdomFieldsg = (
  kingdomFieldsIds: KingdomField['id'][],
  kingdomsFields: KingdomFields,
): KingdomField[] => {
  return kingdomFieldsIds.reduce<KingdomField[]>((acc, fieldId) => {
    if (kingdomsFields[fieldId]) {
      acc.push(kingdomsFields[fieldId]);
    }
    return acc;
  }, []);
};

export const getKingdomRuinsCounts = (kingdomFields: KingdomField[]): number => {
  return kingdomFields.reduce<number>((acc, field) => {
    const domain = field.domains.world;
    if (domain && domain.type === 'ruin') acc += 1;
    return acc;
  }, 0);
};

// export function getKingdoms() {
//   return useGameStore.getState().kingdoms;
// }

// export function getKingdomsIds() {
//   return Object.keys(useGameStore.getState().kingdoms);
// }

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

/** 
* Рахує і повертає кількість руїн в королівстві
* 
* @param  {Kingdom["id"]} kingdomId  - id королівства
* 
* @returns {number} - кількість руїн
* 
* @see getKingdomFields
*/
export function getKingdomRuinsCount(kingdomId: Kingdom['id']): number {
  return getKingdomFields(kingdomId).reduce<number>((acc, field) => {
    const domain = field.domains.world;
    if (domain && domain.type === 'ruin') acc += 1;
    return acc;
  }, 0);
}
