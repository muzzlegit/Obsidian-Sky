import { engineEventBus } from "@engine/eventBus/engineEventBus/engineEventBus";
import { type Ruin, type TimedDomain } from "@engine/sharedBridge";
import { mutate, select } from "@engine/store/store";

/**
 * Додає руїну до масиву тимчасових доменів з часом життя.
 *
 * @param {Ruin["id"]} ruinId - Ідентифікатор руїни, яку потрібно додати.
 *
 * @description
 * Функція отримує час життя руїни через `getRuinLifeTime`.
 * Якщо час життя існує, додає об'єкт до `state.timedDomains`:
 * - `id` — ідентифікатор руїни,
 * - `type` — тип домену ("ruin"),
 * - `expiresAt` — час, коли руїна перестане існувати (мілісекунди від Unix Epoch).
 *
 * Якщо `lifeTime` не визначено, функція нічого не робить.
 *
 *@see engineEventBus
 *
 * @example
 * addRuinToTimedDomain("ruin_123");
 */
export function addRuinToTimedDomain(ruinId: Ruin["id"]) {
  const lifeTime = engineEventBus.query("ruin:getRuinLifeTime", ruinId);
  if (!lifeTime) return;
  mutate((state) =>
    state.timedDomains.push({
      id: ruinId,
      type: "ruin",
      expiresAt: Date.now() + lifeTime,
    })
  );
}

// ---- QUERIES ----

/**
 * Повертає всі активні об’єкти з обмеженим часом існування (timed domains) зі стану гри.
 *
 * @returns {TimedDomain[]} Масив об’єктів типу `TimedDomain`, що містять дані про елементи із таймером (наприклад, руїни).
 *
 * @see select
 *
 * @example
 * const domains = getTimedDomains();
 * domains.forEach(d => {
 *   console.log(`${d.type} з ID ${d.id} зникне о ${new Date(d.expiresAt).toLocaleTimeString()}`);
 * });
 */
export function getTimedDomains(): TimedDomain[] {
  return select((state) => state.timedDomains);
}
