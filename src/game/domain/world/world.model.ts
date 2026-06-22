import { generateId } from '#shared/utils/generateId';
import type { Kingdom, KingdomFields, TerrainType } from '../kingdom/kingdom.types';
import type { WorldKingdoms } from './world.types';

export const generateKingdomsData = (worldData: TerrainType[][]) => {
  const kingdomsQuantity = worldData?.length ?? 0;
  const kingdoms: WorldKingdoms = {};
  let fields: KingdomFields = {};

  for (let kingdomIndex = 0; kingdomIndex < kingdomsQuantity; kingdomIndex++) {
    const kingdomId = generateId('kingdom');
    const fieldsData = generateKingdomFields(worldData[kingdomIndex], kingdomId);
    fields = { ...fields, ...fieldsData };
    kingdoms[kingdomId] = {
      id: kingdomId,
    };
  }
  return { kingdoms, fields };
};

export const generateKingdomFields = (
  fieldsData: TerrainType[],
  kingdomId: Kingdom['id'],
): KingdomFields => {
  const fields: KingdomFields = {};
  for (let fieldIndex = 0; fieldIndex < fieldsData?.length; fieldIndex++) {
    const fieldId = generateId('field');
    fields[fieldId] = {
      id: fieldId,
      index: fieldIndex,
      kingdomId,
      terrain: fieldsData[fieldIndex],
      domains: { underworld: null, world: null },
    };
  }
  return fields;
};
