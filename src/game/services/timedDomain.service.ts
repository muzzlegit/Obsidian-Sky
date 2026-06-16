import { useGameStore } from '#/store/gameStore';
import type { DomainEntity, DomainLocation, TimedDomain } from '../domain/game.public';

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
}

function removeTimedDomainFromStore(timedDomainId: TimedDomain['id']) {
  useGameStore.setState((state) => {
    state.timedDomains.filter((domain) => domain.id !== timedDomainId);
  });
}

export const timedDomainService = {
  getTimedDomainsStore,
  addTimedDomainToStore,
  removeTimedDomainFromStore,
};
