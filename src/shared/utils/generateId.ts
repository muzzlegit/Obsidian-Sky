/**
 * Генерує унікальний рядковий ідентифікатор.
 *
 * @param key - (необов'язково) префікс для групування ідентифікаторів,
 *              наприклад тип сутності: "unit", "ruin", "player".
 *              Якщо не вказано — буде використано тільки унікальна частина.
 *
 * @returns Унікальний ID формату:
 *          "<key>_<timestamp>_<hash>" або "<timestamp>_<hash>" якщо key не передано.
 *
 * @example
 * generateId("unit"); // "unit_1738445000112_f4a9e"
 *
 * @example
 * generateId(); // "1738445000112_f4a9e"
 */
export function generateId(key?: string): string {
  const unique = `${Date.now()}_${Math.random().toString(16).slice(2)}`;
  return key ? `${key}_${unique}` : unique;
}
