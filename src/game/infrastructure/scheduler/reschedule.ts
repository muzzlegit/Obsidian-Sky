import { kingdomService } from '#/game/domain/kingdom/kingdom.service';
import { schedulerService } from './scheduler.service';

let schedulerTimeoutId = null;

export function reschedule() {
  console.log('timedDomainSystem');
  // Очищаємо попередній таймер, якщо він був (захист від дублювання)
  if (schedulerTimeoutId) {
    clearTimeout(schedulerTimeoutId);
    schedulerTimeoutId = null;
  }

  const schedulerStore = schedulerService.getSchedulerStore();

  const now = Date.now();

  const expiredDomains = schedulerStore.filter((d) => d.expiresAt <= now);

  // Якщо немає володінь, завершуємо роботу
  if (!expiredDomains.length) return;

  // Видаляємо всі володіння, час яких ВЖЕ вийшов на цей момент
  if (expiredDomains.length > 0) {
    expiredDomains.forEach((domain) => {
      const { payload, expiresAt } = domain;

      const fieldDomain = kingdomService.getDomain(payload.location);

      if (fieldDomain && expiresAt <= now) {
        switch (fieldDomain.type) {
          case 'ruin':
            EVENT_BUS.emit('ruin:expired', { ruinId: id, location });
            break;

          default:
            break;
        }
      }
    });
  }

  // Отримуємо оновлений список володінь, які ще живі
  const activeDomains = schedulerService.getSchedulerStore();
  if (activeDomains.length === 0) return;

  // Шукаємо володіння з найменшим часом життя (найближче до зникнення)
  let closestDomain = activeDomains[0];
  for (let i = 1; i < activeDomains.length; i++) {
    if (activeDomains[i].expiresAt < closestDomain.expiresAt) {
      closestDomain = activeDomains[i];
    }
  }
  // Рахуємо, скільки мілісекунд залишилося до зникнення найближчого
  const delay = closestDomain.expiresAt - Date.now();

  // Додаємо мізерний запас у 10-50мс, щоб гарантувати, що час точно перешагнув дедлайн
  const safeDelay = Math.max(delay + 20, 0);

  // Запускаємо функцію по колу через прорахований час
  timedDomainTimeoutId = setTimeout(() => {
    scheduleExpiration();
  }, safeDelay);
}
