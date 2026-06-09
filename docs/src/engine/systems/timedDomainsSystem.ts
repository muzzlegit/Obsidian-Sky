import { engineEventBus } from "@engine/eventBus/engineEventBus/engineEventBus";
import { mutate } from "@engine/store/store";

/**
 * Оновлює стан гри, перевіряючи всі тимчасові домени (наприклад, руїни з обмеженим часом існування).
 *
 * - Якщо час життя (`expiresAt`) домену минув — викликається подія `ruin:expired`.
 * - Після цього видаляє всі прострочені домени зі стану гри.
 *
 * @returns {void}
 *
 * @example
 * Виконується у циклі гри або системі оновлень
 * timedDomainsSystem();
 * Якщо якийсь домен прострочено, буде викликано подію ruin:expired
 */
export function timedDomainsSystem(): void {
  const timedDomains = engineEventBus.query("timedDomains:getTimedDomains");
  let hasExpired = false;
  const now = Date.now();
  const filteredTimedDomais = timedDomains.filter((d) => {
    if (d.expiresAt <= now) {
      hasExpired = true;
      switch (d.type) {
        case "ruin":
          engineEventBus.emit("ruin:expired", d.id);
          break;
        default:
          break;
      }
      return false;
    }
    return d;
  });
  if (hasExpired) {
    mutate((state) => (state.timedDomains = filteredTimedDomais));
  }
}
