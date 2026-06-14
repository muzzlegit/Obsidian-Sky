import type { Kingdom, KingdomField, KingdomFields, WorldKingdoms } from '#/game/game.types';
import { useGameStore } from '#/store/gameStore';

/**
 * Повертає дані усіх королівст з БД
 *
 * @returns {WorldKingdoms} - дані всіх королівств серверу
 *
 * @see useGameStore
 */
export async function getKingdomsStore(): Promise<WorldKingdoms> {
  return useGameStore.getState().kingdoms;
}

/**
 */
export async function getKingdomField(fieldId: KingdomField['id']): Promise<KingdomField> {
  return useGameStore.getState().kingdomsFields[fieldId];
}

/**
 * Повертає масив даних полів заданого королівства
 *
 * @param  {Kingdom["id"]} kingdomId  - id королівства
 *
 * @see useGameStore
 */
export async function getKingdomFields(kingdomId: Kingdom['id']) {
  const { kingdoms, kingdomsFields } = useGameStore.getState();
  const kingdom = kingdoms[kingdomId];
  if (!kingdom) return [] as KingdomField[];

  return kingdom.fieldsIds.map((id) => kingdomsFields[id]).filter((field) => Boolean(field));
}

/**
 * Повертає дані всіх полів серверу
 *
 * @returns {KingdomFields} - дані всіх королівстiв
 *
 * @see useGameStore
 */
export async function getKingdomsFieldsStore(): Promise<KingdomFields> {
  return useGameStore.getState().kingdomsFields;
}

/**
 * Перезаписує дані поля
 *
 * @param {KingdomField} kingdomField - дані поля
 *
 * @see useGameStore
 *
 * @returns {boolean}
 */
export async function setField(kingdomField: KingdomField): Promise<boolean> {
  if (!useGameStore.getState().kingdomsFields[kingdomField.id]) return false;
  useGameStore.setState((state) => {
    state.kingdomsFields[kingdomField.id] = kingdomField;
  });

  return true;
}
