import type { TerrainType } from '../kingdom/kingdom.types';
import { ARHON } from './templates/arhon';
import { generateKingdomsData } from './world.model';

export const worldSystem = {
  generateWorld: () => {
    const worldRaw = generateKingdomsData(ARHON as TerrainType[][]);

    return {
      isCreated: true,
      createdAt: new Date().toISOString(),
      kingdoms: worldRaw.kingdoms,
      kingdomsFields: worldRaw.fields,
    };
  },

  bootWorld: (isGenerated: boolean) => {
    if (isGenerated) {
      console.log('Loaded existing world');
      return false;
    }

    console.log('Generating new world...');

    const newWorld = worldSystem.generateWorld();

    return newWorld;
  },
};
