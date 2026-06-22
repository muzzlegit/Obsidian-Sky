import type { Ruin } from '../game.public';

export type Kingdom = {
  id: string;
};

export type KingdomField = {
  id: string;
  index: number;
  kingdomId: string;
  terrain: TerrainType;
  domains: {
    world: Domain | null;
    underworld: Domain | null;
  };
};

export type FieldDomainPlace = 'world' | 'underworld';

export type KingdomFields = Record<KingdomField['id'], KingdomField>;

export type FieldDomain = {
  id: string;
  type: DomainType;
} | null;

export type Domain = {
  id: string;
  type: DomainType;
};

export type DomainType = 'ruin';

export type DomainEntity = Ruin;

export type DomainLayer = keyof KingdomField['domains'];

export type TimedDomain = {
  id: string;
  expiresAt: number;
  location: DomainLocation;
};

export type DomainLocation = {
  fieldId: KingdomField['id'];
  layer: DomainLayer;
};

export type TerrainType =
  | 'cursedForest'
  | 'deadLand'
  | 'hollyLand'
  | 'magicForest'
  | 'mountain'
  | 'desert'
  | 'forest'
  | 'steppe'
  | 'dungeon';
