import { randomInt } from '#/shared/utils/randomInt';
import { weightedRandom } from '#/shared/utils/weightedRandom';
import { generateId } from '#shared/utils/generateId';
import { CITY_CELLS_AMOUNT_MAP } from '../city/city.constants';
import { VILLAGE_CELLS_AMOUNT, VILLAGES_AMOUNT } from '../kingdom/kingdom.constants';
import type {
  Cell,
  FieldCells,
  FieldDomain,
  Kingdom,
  KingdomFields,
  TerrainType,
} from '../kingdom/kingdom.types';
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
      terrain: fieldsData[fieldIndex]!,
      cells: generateFieldCells(),
      domains: { underworld: null, world: null },
    };
  }
  return fields;
};

function generateFieldCells(): FieldCells {
  const villages: FieldCells['villages'] = Array.from({ length: VILLAGES_AMOUNT }, () =>
    Array.from({ length: VILLAGE_CELLS_AMOUNT }, createCell),
  );
  const fieldLevel = weightedRandom({ 1: 20, 2: 20, 3: 20, 4: 20, 5: 20, none: 10 });

  if (fieldLevel === 'none') return { villages, city: null };

  const cellsAmount = randomInt(
    CITY_CELLS_AMOUNT_MAP[fieldLevel].min,
    CITY_CELLS_AMOUNT_MAP[fieldLevel].max,
  );
  const city: FieldCells['city'] = Array.from({ length: cellsAmount }, createCell);

  return { villages, city };
}

const createCell = () => ({
  id: generateId('cell'),
});
