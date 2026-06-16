import { getRandomItem } from '#/shared/utils/getRandomItem';
import { useGameStore } from '#/store/gameStore';
import type {
  Domain,
  DomainLocation,
  FieldDomainPlace,
  Kingdom,
  KingdomField,
  KingdomFields,
  WorldKingdoms,
} from '../domain/game.public';

// GET
/**
 * Повертає дані усіх королівст з БД
 *
 * @returns {WorldKingdoms} - дані всіх королівств серверу
 *
 * @see useGameStore
 */
function getKingdomsStore(): WorldKingdoms {
  return useGameStore.getState().kingdoms;
}

/**
 */
function getField(fieldId: KingdomField['id']): KingdomField {
  return useGameStore.getState().kingdomsFields[fieldId]!;
}

/**
 * Повертає масив даних полів заданого королівства
 *
 * @param  {Kingdom["id"]} kingdomId  - id королівства
 *
 * @see useGameStore
 */
function getKingdomFields(kingdomId: Kingdom['id']): KingdomField[] {
  const { kingdoms, kingdomsFields } = useGameStore.getState();
  const kingdom = kingdoms[kingdomId];
  if (!kingdom) return [] as KingdomField[];

  return kingdom.fieldsIds.map((id) => kingdomsFields[id]!).filter((field) => Boolean(field));
}

/**
 * Повертає дані всіх полів серверу
 *
 * @returns {KingdomFields} - дані всіх королівстiв
 *
 * @see useGameStore
 */
function getFieldsStore(): KingdomFields {
  return useGameStore.getState().kingdomsFields;
}

/**
 *
 * @param kingdomId
 * @param layer
 * @returns
 */
function pickRandomAvailableFieldId({
  kingdomId,
  layer,
}: {
  kingdomId: Kingdom['id'];
  layer: FieldDomainPlace;
}) {
  const fields = getKingdomFields(kingdomId);
  const freeFields = fields
    .filter((field): field is KingdomField => !!field && !field.domains[layer])
    .map((field) => field.id);

  return getRandomItem(freeFields);
}

function getDomain(location: DomainLocation): Domain {
  const field = getField(location.fieldId);
  if (!field || !field.domains) return;
  return field.domains[location.layer];
}

// SET

/**
 * Перезаписує дані поля
 *
 * @param {KingdomField} kingdomField - дані поля
 *
 * @see useGameStore
 *
 * @returns {boolean}
 */
function setField(kingdomField: KingdomField): boolean {
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
function addDomainToKingdom({ domain, location }: { domain: Domain; location: DomainLocation }) {
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

function removeDomainFromKingdom({
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

export const kingdomService = {
  getKingdomsStore,
  getKingdomFields,
  getFieldsStore,
  getField,
  setField,
  getDomain,
  addDomainToKingdom,
  removeDomainFromKingdom,
  pickRandomAvailableFieldId,
};
