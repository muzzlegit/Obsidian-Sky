import {
  FIELDS_QUANTITY,
  MAX_RUINS_PER_KINGDOM,
  type Kingdom,
  type Ruin,
} from "@engine/sharedBridge";
import { mutate, select } from "@engine/store/store";
import { getRandomFreeIndex, manageItemInArrayByAction } from "@utils/helpers";

/**
 * Додає руїну до вказаного королівства, якщо є вільне поле.
 *
 * @param {number} kingdomIndex - Індекс королівства у стані.
 * @param {id: Ruin["id"], type: Ruin["type"]} ruin - Ідентифікатор руїни, яку потрібно додати.
 *
 * @returns {{ kingdomIndex: number; fieldIndex: number } | null}
 * Повертає об'єкт із індексом королівства та поля, якщо додано успішно,
 * або `null`, якщо не знайдено вільного місця.
 *
 * @see getRandomFreeIndex
 * @see manageItemInArrayByAction
 */
export function addRuinToKingdom({
  kingdomIndex,
  ruin,
}: {
  kingdomIndex: number;
  ruin: {
    id: Ruin["id"];
    type: Ruin["type"];
  };
}): { kingdomIndex: number; fieldIndex: number } | null {
  let fieldIndex: number | null = null;

  mutate((state) => {
    const kingdom = state.kingdoms[kingdomIndex];
    if (!kingdom) {
      console.warn(
        `KingdomService:addDomainToKingdom: Руїна з ID ${ruin.id} не додано в королівство ${kingdomIndex}, немає вільного поля`
      );
    }
    const { occupiedFields, fields } = kingdom;
    fieldIndex = getRandomFreeIndex(occupiedFields, FIELDS_QUANTITY);
    if (fieldIndex === null || fieldIndex === undefined) {
      console.warn(
        `KingdomService:addDomainToKingdom: Руїна з ID ${ruin.id} не додано в королівство ${kingdomIndex}, немає вільного поля`
      );
      return;
    }
    kingdom.ruinsQuantity++;
    kingdom.occupiedFields = manageItemInArrayByAction(
      "add",
      fieldIndex,
      occupiedFields
    );
    fields[fieldIndex].domains.world = ruin;
  });
  return fieldIndex !== null ? { kingdomIndex, fieldIndex } : null;
}

export function removeRuinFromKingdom({
  ruinId,
  ruinLocation,
}: {
  ruinId: Ruin["id"];
  ruinLocation: Ruin["location"];
}) {
  if (!ruinLocation) return;
  const { kingdomIndex, fieldIndex } = ruinLocation;
  const kingdom = getKingdom(kingdomIndex);
  const currentDomain = kingdom?.fields[fieldIndex].domains.world?.id;
  if (currentDomain === ruinId) {
    mutate((state) => {
      state.kingdoms[kingdomIndex].fields[fieldIndex].domains.world === null;
      state.kingdoms[kingdomIndex].ruinsQuantity--;
      state.kingdoms[kingdomIndex].occupiedFields = state.kingdoms[
        kingdomIndex
      ].occupiedFields.filter((f) => f !== fieldIndex);
    });
  }
}
// ---- QUERIES ----

/**
 * Повертає список усіх королівств з БД.
 *
 * @returns {Kingdom[]} Масив об'єктів королівств.
 *
 * @see select
 */
export function getKingdoms(): Kingdom[] {
  return select((state) => state.kingdoms);
}

/**
 * Повертає список ID усіх королівств з БД.
 *
 * @returns {Kingdom["id"][]} Масив id королівств.
 *
 * @see select
 */
export function getKingdomsIdList(): Kingdom["id"][] {
  return select((state) => state.kingdoms).map((kingdom) => kingdom.id);
}

/**
 * Повертає  королівсто по індексу з БД.
 *
 * @param {number} kingdomIndex
 * @returns {Kingdom} Королівство або null.
 *
 * @see select
 */
export function getKingdom(kingdomIndex: number): Kingdom | null {
  return select((state) => state.kingdoms[kingdomIndex]);
}

/**
 * Повертає  королівсто по id з БД.
 *
 * @param {Kingdom["id"]} kingdomId
 * @returns {Kingdom} Королівство або null.
 *
 * @see select
 */
export function getKingdomById(kingdomId: Kingdom["id"]): Kingdom | null {
  return (
    select((state) =>
      state.kingdoms.find((kingdom) => kingdom.id === kingdomId)
    ) ?? null
  );
}

/**
 * Обчислює кількість руїн, яку можна додати до королівства.
 * Повертає false, якщо королівство вже має максимальну кількість руїн.
 *
 * @param {number} kingdomIndex - Індекс королівства в масиві state.kingdoms.
 * @returns {number | false} Кількість руїн, яку можна додати, або false якщо ліміт досягнуто.
 *
 * @see select
 */
export function getRequiredRuinsForKingdom(
  kingdomIndex: number
): number | false {
  const kingdom = select((state) => state.kingdoms[kingdomIndex]);
  const { ruinsQuantity, occupiedFields } = kingdom;
  const remaining = Math.min(
    MAX_RUINS_PER_KINGDOM - ruinsQuantity,
    FIELDS_QUANTITY - occupiedFields.length
  );
  return remaining > 0 ? remaining : false;
}
