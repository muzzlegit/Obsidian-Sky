import { EVENT_BUS } from '../infrastructure/eventBus/engineEventBus/eventBus';

export function timedDomainSystem() {
  const timedDomains = EVENT_BUS.query('timedDomains:getTimedDomainsStore');

  timedDomains.forEach((domain) => {
    const { id, location, expiresAt } = domain;

    const fieldDomain = EVENT_BUS.query('kingdom:getDomain', location);

    const now = Date.now();
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
