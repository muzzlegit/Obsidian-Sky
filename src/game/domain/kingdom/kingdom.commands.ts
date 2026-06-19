import { useGameStore } from '#/store/gameStore';
import type { Domain, DomainLocation, KingdomField } from '../game.public';
import { getField } from './kingdom.queries';

/**
 * Перезаписує дані поля
 *
 * @param {KingdomField} kingdomField - дані поля
 *
 * @see useGameStore
 *
 * @returns {boolean}
 */
export function setField(kingdomField: KingdomField): boolean {
  useGameStore.setState((state) => {
    state.kingdomsFields[kingdomField.id] = kingdomField;
  });

  return true;
}

/**
 *
 * @param fieldId
 * @param domain
 * @returns
 */
export function addDomainToKingdom({
  domain,
  location,
}: {
  domain: Domain;
  location: DomainLocation;
}) {
  const { fieldId, layer } = location;
  const field = getField(fieldId);
  if (!field) {
    return null;
  }

  setField({
    ...field,
    domains: {
      ...field.domains,
      [layer]: domain,
    },
  });
}

export function removeDomainFromKingdom({
  domainId,
  location,
}: {
  domainId: string;
  location: DomainLocation;
}) {
  const { fieldId, layer } = location;

  const field = getField(fieldId);
  if (!field) {
    return null;
  }

  if (field.domains[layer]?.id !== domainId) {
    return null;
  }

  setField({
    ...field,
    domains: {
      ...field.domains,
      [layer]: null,
    },
  });
}
