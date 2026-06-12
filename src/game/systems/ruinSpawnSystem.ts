import {
  getKingdomRuinsCountMap,
  getRandomFreeKingdomFieldId,
} from '../entitites/kingdom/kingdom.selectors';

export function ruinSpawnSystem() {
  const ruinsCountMap = getKingdomRuinsCountMap();

  console.log(getRandomFreeKingdomFieldId(Object.keys(ruinsCountMap)[0], 'world'));
}
