import { addDomainToKingdom } from '../entities/kingdom/kingdom.entities';
import {
  getKingdomRuinsCountMap,
  getRandomFreeKingdomFieldId,
} from '../entities/kingdom/kingdom.selectors';
import { MAX_RUINS_PER_KINGDOM } from '../entities/ruin/ruin.constants';
import { addRuinToStore } from '../entities/ruin/ruin.entities';
import { generateRandomRuins } from '../entities/ruin/ruin.helpers';

export async function ruinSpawnSystem() {
  const ruinsCountMap = await getKingdomRuinsCountMap();
  Object.entries(ruinsCountMap).forEach(([kingdomId, ruinsCount]) => {
    const ruins = generateRandomRuins(MAX_RUINS_PER_KINGDOM - ruinsCount);
    ruins.forEach((ruin) => {
      const id = await getRandomFreeKingdomFieldId(kingdomId, 'world');
      if (!id) return;
      // addRuinToStore(ruin);
      addDomainToKingdom(id, { type: ruin.type, id: ruin.id });
    });
  });
}
