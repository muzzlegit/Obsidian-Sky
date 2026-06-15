import type { Domain } from './kingdom.types';

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

export const kingdomEntity = {
  toDomainRef,
};
