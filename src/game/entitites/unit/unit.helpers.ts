import { RACE_TO_FRACTION } from '#game/entitites/race/race.constants';
import unitsData from './data/units.json';
import { ADDITION_UNIT_PROPERTIES, COMMON_UNIT_PROPERTIES } from './unit.constants';
import type { Unit, UnitRawData } from './unit.types';
/**
 * Генерує сутність юніта по заданим параметрам.
 *
 * @param type - тип юніта (напр. "porter")
 * @param race - раса юніта (гравця) (напр. "demons")
 * @param level - рівень юніта(напр. 1)
 * @param quantity - кількість юнітів даного типу (напр. 123)
 *
 * @returns Новий об'єкт юніта із зазнченими параметрами і кількістю або null, якщо дані не знайдені
 *
 * @example
 * Створеня лучника 1 лвл раси демонів в кількості 123
 * const unit = generateUnit("archer", "demons", 1, 123);
 * console.log(unit.quantity, unit.type); // 123, "archer"
 * Якщо даних по заданим параметрам не знайдено повертає null
 * generateUnit("porter", "demon", 1, 123); // null
 *
 */
export function generateUnit(
  type: Unit['type'],
  race: Unit['race'],
  level: Unit['level'],
  quantity: number,
): Unit | null {
  const rowUnitData: UnitRawData | undefined = unitsData?.[race]?.[type];
  if (!rowUnitData) return null;
  const { name, attackMax, attackMin, health, capacity, resurrection, towersSuppression } =
    rowUnitData;
  const attack =
    attackMax[level - 1] === 0 ? '0' : `${attackMin[level - 1]}-${attackMax[level - 1]}`;
  const unit: Unit = {
    name: name[level - 1],
    type,
    level,
    race,
    fraction: RACE_TO_FRACTION[race],
    quantity,
    attack,
    attackMax: attackMax[level - 1],
    attackMin: attackMin[level - 1],
    health: health[level - 1],
    ...(capacity && { capacity: capacity[level - 1] }),
    ...(resurrection && { resurrection: resurrection[level - 1] }),
    ...(towersSuppression && {
      towersSuppression: towersSuppression[level - 1],
    }),
    ...COMMON_UNIT_PROPERTIES,
    ...ADDITION_UNIT_PROPERTIES[type],
  };

  return unit;
}
