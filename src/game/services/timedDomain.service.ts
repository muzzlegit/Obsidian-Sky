import { useGameStore } from '#/store/gameStore';
import type { DomainType, TimedDomain } from '../domain/game.public';

function getTimedDomainsStore(): TimedDomain[] {
  return useGameStore.getState().timedDomains;
}

function addTimedDomainToStore({
  id,
  type,
  lifeTime,
}: {
  id: string;
  lifeTime: number;
  type: DomainType;
}) {
  const expiresAt = lifeTime + Date.now();
  useGameStore.setState((state) => {
    state.timedDomains.push({ id, type, expiresAt });
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
