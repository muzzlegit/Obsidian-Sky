import { kingdomEntity } from '../domain/kingdom/kingdom.entity';
import { kingdomService } from '../domain/kingdom/kingdom.service';
import type { Kingdom } from '../domain/kingdom/kingdom.types';
import { MAX_RUINS_PER_KINGDOM } from '../domain/ruin/ruin.constants';
import { generateRandomRuins } from '../domain/ruin/ruin.entity';
import { EVENT_BUS } from '../infrastructure/eventBus/eventBus';

export function ruinSpawnSystem() {
  const kingdoms = kingdomService.getKingdomsStore();

  const kingdomsFields = kingdomService.getFieldsStore();

  // Вирховуємо кількість руїн в королівстві, якщо менше максимальної кількості генеруємо і додаємо
  let ruinsCount: number = 0;
  // Перебираємо королівства
  for (const kingdomId in kingdoms) {
    const kingdom = kingdoms[kingdomId as Kingdom['id']];
    const kingdomFields = Object.values(kingdomsFields).filter(
      (field) => field.kingdomId === kingdom.id,
    );
    // Перебираємо поля в королівстві
    kingdomFields.forEach((field) => {
      const domain = field?.domains.world;
      // Рахуємо руїни
      if (domain?.type === 'ruin') {
        ruinsCount++;
      }
    });
    if (ruinsCount < MAX_RUINS_PER_KINGDOM) {
      // Генеруємо необхідну кількість руїн
      const ruins = generateRandomRuins(MAX_RUINS_PER_KINGDOM - ruinsCount);
      // Додаємо руїни у світ
      ruins.forEach((ruin) => {
        const id = kingdomService.getRandomAvailableFieldId(
          kingdom.id,
          kingdomEntity.getDomainLayer(ruin.type),
        );
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
