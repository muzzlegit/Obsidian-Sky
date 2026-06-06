import { generateKingdomsData } from './world.model';
import WORLD_TEMPLATE from './templates/arhon.json';
import type { TerrainType } from '#game/entitites/kingdom/kingdom.types';

export const worldSystem = {
  generateWorld: () => {
    const worldRaw = generateKingdomsData(WORLD_TEMPLATE as TerrainType[][]);

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
