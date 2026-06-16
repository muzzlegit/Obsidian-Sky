import type { Domain, DomainLayer, DomainType } from './kingdom.types';

function toDomainRef<
  T extends {
    id: Domain['id'];
    type: Domain['type'];
  },
>(domain: T): { id: Domain['id']; type: Domain['type'] } {
  return {
    id: domain.id,
    type: domain.type,
  };
}

function getDomainLayer(domainType: DomainType): DomainLayer {
  const layer = {
    ruin: 'world',
  } as const;

  return layer[domainType];
}

export const kingdomEntity = {
  toDomainRef,
  getDomainLayer,
};
