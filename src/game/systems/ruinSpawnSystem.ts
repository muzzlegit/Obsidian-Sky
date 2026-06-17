import { kingdomEntity } from '../domain/kingdom/kingdom.entity';
import type { Kingdom } from '../domain/kingdom/kingdom.types';
import { MAX_RUINS_PER_KINGDOM } from '../domain/ruin/ruin.constants';
import { generateRandomRuins } from '../domain/ruin/ruin.entity';
import { EVENT_BUS } from '../infrastructure/eventBus/engineEventBus/eventBus';

export function ruinSpawnSystem() {
  const kingdoms = EVENT_BUS.query('kingdom:getKingdomsStore');
  const kingdomsFields = EVENT_BUS.query('kingdom:getFieldsStore');

  // Вирховуємо кількість руїн в королівстві, якщо менше максимальної кількості генеруємо і додаємо
  let ruinsCount: number = 0;
  // Перебираємо королівства
  for (const kingdomId in kingdoms) {
    const kingdom = kingdoms[kingdomId as Kingdom['id']];
    // Перебираємо поля в королівстві
    for (const fieldId of kingdom.fieldsIds) {
      const field = kingdomsFields[fieldId];
      const domain = field?.domains.world;
      // Рахуємо руїни
      if (domain?.type === 'ruin') {
        ruinsCount++;
      }
    }
    console.log(ruinsCount);
    if (ruinsCount < MAX_RUINS_PER_KINGDOM) {
      // Генеруємо необхідну кількість руїн
      const ruins = generateRandomRuins(MAX_RUINS_PER_KINGDOM - ruinsCount);
      // Додаємо руїни у світ
      ruins.forEach((ruin) => {
        const id = EVENT_BUS.query('kingdom:pickRandomAvailableFieldId', {
          kingdomId,
          layer: 'world',
        });
        if (!id) return;
        EVENT_BUS.emit('ruin:spawned', {
          ruin,
          location: { fieldId: id, layer: kingdomEntity.getDomainLayer(ruin.type) },
        });
      });
    }
    ruinsCount = 0;
  }
}
