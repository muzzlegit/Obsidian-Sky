import { generateRandomLevelRuin } from "@engine/domains/ruin/ruin.helpers";
import { engineEventBus } from "@engine/eventBus/engineEventBus/engineEventBus";
import { addRuinToKingdom } from "@engine/services/kingdom.service";
import { spawnRuin } from "@engine/services/ruin.service";

/**
 * Система спавну руїн для всіх королівств.
 *
 * Ця функція проходить всі королівства, перевіряє, скільки руїн
 * можна додати у кожне (через query "kingdom:getRequiredRuinsForKingdom"),
 * генерує випадкові руїни та додає їх до стану.
 *
 * Для кожної створеної руїни виконується:
 * - визначення позиції в королівстві (`addRuinToKingdom`)
 * - додавання руїни в стан (`spawnRuin`)
 *
 * Використовує engineEventBus для запитів стану та мутацій.
 *
 * @remarks
 * Не повертає значення, мутує стан через сервіс та викликає події
 * для кожної створеної руїни.
 */
export function ruinsSpawnSystem() {
  const kingdoms = engineEventBus.query("kingdom:getKingdoms");
  kingdoms.forEach((__, index) => {
    const ruinsQuantity = engineEventBus.query(
      "kingdom:getRequiredRuinsForKingdom",
      index
    );
    if (!ruinsQuantity) return;
    for (let i = 0; i < ruinsQuantity; i++) {
      const ruin = generateRandomLevelRuin();
      const location = addRuinToKingdom({
        kingdomIndex: index,
        ruin: {
          id: ruin.id,
          type: ruin.type,
        },
      });
      if (!location) return;
      spawnRuin(ruin, location);
    }
  });
}
