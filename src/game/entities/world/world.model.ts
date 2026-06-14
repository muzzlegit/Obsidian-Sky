import type { KingdomFields, TerrainType } from '#game/entitites/kingdom/kingdom.types';
import type { WorldKingdoms } from '#game/entitites/world/world.types';
import { generateId } from '#shared/utils/generateId';

export const generateKingdomsData = (worldData: TerrainType[][]) => {
  const kingdomsQuantity = worldData?.length ?? 0;
  const kingdoms: WorldKingdoms = {};
  let fields: KingdomFields = {};

  for (let kingdomIndex = 0; kingdomIndex < kingdomsQuantity; kingdomIndex++) {
    const kingdomId = generateId('kingdom');
    const fieldsData = generateKingdomFields(worldData[kingdomIndex]);
    fields = { ...fields, ...fieldsData };
    kingdoms[kingdomId] = {
      id: kingdomId,
      fieldsIds: [...Object.keys(fieldsData)],
    };
  }
  return { kingdoms, fields };
};

export const generateKingdomFields = (fieldsData: TerrainType[]): KingdomFields => {
  const fields: KingdomFields = {};
  for (let fieldIndex = 0; fieldIndex < fieldsData?.length; fieldIndex++) {
    const fieldId = generateId('field');
    fields[fieldId] = {
      id: fieldId,
      index: fieldIndex,
      terrain: fieldsData[fieldIndex],
      domains: { underworld: null, world: null },
    };
  }
  return fields;
};
