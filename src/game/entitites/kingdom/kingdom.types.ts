export type Kingdom = {
  id: string;
  fieldsIds: KingdomField['id'][];
};

export type KingdomField = {
  id: string;
  index: number;
  terrain: TerrainType;
  domains: {
    world: Domain | null;
    underworld: Domain | null;
  };
};

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
