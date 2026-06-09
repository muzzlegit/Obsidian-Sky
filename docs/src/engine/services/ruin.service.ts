import { engineEventBus } from "@engine/eventBus/engineEventBus/engineEventBus";
import { type Ruin } from "@engine/sharedBridge";
import { mutate, select } from "@engine/store/store";

/**
 * Додає руїну в БД.
 * Також викликає подію `ruin:spawned` у системі подій.
 *
 * @param {Ruin} ruin - Об’єкт руїни, який потрібно створити.
 * @param {Ruin["location"]} ruinLocation - Координати або місце розташування руїни на карті.
 * @returns {void}
 *
 * @example
 * spawnRuin({ id: "ruin-1", level: 2, lifeTime: 60000 }, { x: 12, y: 8 });
 */
export function spawnRuin(ruin: Ruin, ruinLocation: Ruin["location"]): void {
  mutate((state) => state.ruins.push({ ...ruin, location: ruinLocation }));
  engineEventBus.emit("ruin:spawned", ruin.id);
}

/**
 * Видаляє руїну з БД гри за її ID.
 * Якщо руїну знайдено — викликає подію `ruin:destroyed` із даними про її місцезнаходження.
 *
 * @param {Ruin["id"]} ruinId - Унікальний ідентифікатор руїни, яку потрібно видалити.
 * @returns {void}
 *
 * @see getRuinById
 * @see mutate
 * @see engineEventBus
 *
 * @example
 * removeRuin("ruin-1");
 */
export function removeRuin(ruinId: Ruin["id"]): void {
  const ruin = getRuinById(ruinId);
  if (!ruin) {
    console.warn(
      `Ruin_Service(remove_ruin): Руїну з id:${ruinId} не знайдено `
    );
    return;
  }
  mutate((state) => (state.ruins = state.ruins.filter((r) => r.id !== ruinId)));
  engineEventBus.emit("ruin:removed", {
    ruinId,
    ruinLocation: ruin.location,
  });
}

// ---- QUERIES ----

/**
 * Перевіряє наявність руїни по ID
 *
 * @param {Ruin["id"]} ruinId - Унікальний ідентифікатор руїни.
 * @returns true або false
 *
 * @see select
 */
export function isRuinExists(ruinId: Ruin["id"]): boolean {
  return select((state) => state.ruins.some((r) => r.id === ruinId));
}

/**
 * Повертає тривалість існування (lifeTime) руїни за її ID.
 *
 * @param {Ruin["id"]} ruinId - Унікальний ідентифікатор руїни.
 * @returns {Ruin["lifeTime"] | null} Тривалість життя руїни в мілісекундах або `null`, якщо руїну не знайдено.
 *
 * @see select
 *
 * @example
 * const time = getRuinLifeTime("ruin-123");
 * if (time) console.log(`Руїна зникне через ${time} мс`);
 */
export function getRuinLifeTime(ruinId: Ruin["id"]): Ruin["lifeTime"] | null {
  const ruin = select((state) => state.ruins.find((r) => r.id === ruinId));
  return ruin?.lifeTime ?? null;
}

/**
 * Повертає розташування (location) руїни за її ID.
 *
 * @param {Ruin["id"]} ruinId - Унікальний ідентифікатор руїни.
 * @returns {Ruin["location"] | null} Об’єкт розташування руїни або `null`, якщо не знайдено.
 *
 * @see select
 *
 * @example
 * const location = getRuinLocation("ruin-123");
 * if (location) console.log(`Руїна знаходиться в:`, location);
 */
export function getRuinLocation(ruinId: Ruin["id"]): Ruin["location"] | null {
  const ruin = select((state) => state.ruins.find((r) => r.id === ruinId));
  return ruin?.location ?? null;
}

/**
 * Повертає повний об’єкт руїни за її ID.
 *
 * @param {Ruin["id"]} ruinId - Унікальний ідентифікатор руїни.
 * @returns {Ruin | null} Об’єкт руїни або `null`, якщо її не знайдено.
 *
 * @see select
 *
 * @example
 * const ruin = getRuinById("ruin-123");
 * if (ruin) console.log(`Руїна рівня: ${ruin.level}`);
 */
export function getRuinById(ruinId: Ruin["id"]): Ruin | null {
  const ruin = select((state) => state.ruins.find((r) => r.id === ruinId));
  return ruin ?? null;
}
