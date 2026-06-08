import type { KingdomField, KingdomFields } from './kingdom.types';

export const getKingdomFields = (
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

export const getKingdomRuinsCount = (kingdomFields: KingdomField[]): number => {
  return kingdomFields.reduce<number>((acc, field) => {
    const domain = field.domains.world;
    if (domain && domain.type === 'ruin') acc += 1;
    return acc;
  }, 0);
};
