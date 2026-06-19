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
} from '../game.public';

/**
 * Повертає дані усіх королівст з БД
 *
 * @returns {WorldKingdoms} - дані всіх королівств серверу
 *
 * @see useGameStore
 */
export function getKingdomsStore(): WorldKingdoms {
  return useGameStore.getState().kingdoms;
}

/**
 */
export function getField(fieldId: KingdomField['id']): KingdomField {
  return useGameStore.getState().kingdomsFields[fieldId]!;
}

/**
 * Повертає масив даних полів заданого королівства
 *
 * @param  {Kingdom["id"]} kingdomId  - id королівства
 *
 * @see useGameStore
 */
export function getKingdomFields(kingdomId: Kingdom['id']): KingdomField[] {
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
export function getFieldsStore(): KingdomFields {
  return useGameStore.getState().kingdomsFields;
}

/**
 *
 * @param kingdomId
 * @param layer
 * @returns
 */
export function pickRandomAvailableFieldId({
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

export function getDomain(location: DomainLocation): Domain {
  const field = getField(location.fieldId);
  if (!field || !field.domains) return;
  return field.domains[location.layer];
}
