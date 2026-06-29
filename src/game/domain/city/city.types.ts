import type { KingdomField } from '../game.public';
import type { Resources } from '../resource/resource.types';

export type CityType = 'capital' | 'common';
export type CityLevel = 1 | 2 | 3 | 4 | 5;

export type City = {
  id: string;
  fieldId: KingdomField['id'];
  type: CityType;
  level: CityLevel;
  resources: Resources;
  cells: {
    villages: [];
    city: [];
  };
  isGateOpen: boolean;
};
