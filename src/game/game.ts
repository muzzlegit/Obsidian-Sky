import {
  getKingdomField,
  getKingdomFields,
  getKingdomsFieldsStore,
  getKingdomsStore,
  setField,
} from '#/store/repositories/kingdom.repository';
import type { Kingdom, KingdomField, KingdomFields } from './entities/kingdom/kingdom.types';
import type { WorldKingdoms } from './entities/world/world.types';

export const game = {
  // KINGDOM
  getKingdomsStore: async (): Promise<WorldKingdoms> => {
    return await getKingdomsStore();
  },
  getKingdomsFieldsStore: async (): Promise<KingdomFields> => {
    return await getKingdomsFieldsStore();
  },
  getKingdomFiled: async (fieldId: KingdomField['id']): Promise<KingdomField> => {
    return await getKingdomField(fieldId);
  },
  getKingdomFields: async (kingdomId: Kingdom['id']): Promise<KingdomField[]> => {
    return await getKingdomFields(kingdomId);
  },
  setField: async (field: KingdomField): Promise<boolean> => {
    return await setField(field);
  },
  // RUIN
};
