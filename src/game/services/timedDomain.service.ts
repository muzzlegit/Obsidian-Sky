import { useGameStore } from '#/store/gameStore';
import type { DomainEntity, DomainLocation, TimedDomain } from '../domain/game.public';
import { EVENT_BUS } from '../infrastructure/eventBus/eventBus';

let timedDomainTimeoutId = null;

function getTimedDomainsStore(): TimedDomain[] {
  return useGameStore.getState().timedDomains;
}

function addTimedDomainToStore({
  domainEntity,
  location,
}: {
  domainEntity: DomainEntity;
  location: DomainLocation;
}) {
  const expiresAt = domainEntity.lifeTime + Date.now();
  useGameStore.setState((state) => {
    state.timedDomains.push({ id: domainEntity.id, expiresAt, location });
  });
  scheduleExpiration();
}

function removeTimedDomainFromStore(timedDomainId: TimedDomain['id']) {
  useGameStore.setState((state) => {
    state.timedDomains = state.timedDomains.filter((domain) => domain.id !== timedDomainId);
  });
}

function scheduleExpiration() {
  console.log('timedDomainSystem');
  // Очищаємо попередній таймер, якщо він був (захист від дублювання)
  if (timedDomainTimeoutId) {
    clearTimeout(timedDomainTimeoutId);
    timedDomainTimeoutId = null;
  }

  const timedDomains = EVENT_BUS.query('timedDomains:getTimedDomainsStore');
  const now = Date.now();

  const expiredDomains = timedDomains.filter((d) => d.expiresAt <= now);

  // Якщо немає володінь, завершуємо роботу
  // if (!expiredDomains.length) return;

  // Видаляємо всі володіння, час яких ВЖЕ вийшов на цей момент
  if (expiredDomains.length > 0) {
    expiredDomains.forEach((domain) => {
      const { id, location, expiresAt } = domain;

      const fieldDomain = EVENT_BUS.query('kingdom:getDomain', location);

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
  const activeDomains = EVENT_BUS.query('timedDomains:getTimedDomainsStore');
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

export const timedDomainService = {
  getTimedDomainsStore,
  addTimedDomainToStore,
  removeTimedDomainFromStore,
};
