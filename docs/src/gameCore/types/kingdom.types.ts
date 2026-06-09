import type { DomainType, DomainUI, ServerId } from "./server.types";

export type Kingdom = {
  id: ServerId;
  ruinsQuantity: number;
  occupiedFields: number[];
  fields: KingdomField[];
};

export type KingdomField = {
  id: ServerId;
  terrain: TerrainType;
  domains: Record<FieldLayer, FieldDomain>;
};

export type FieldLayer = "world" | "underworld";

export type FieldDomain = {
  id: ServerId;
  type: DomainType;
} | null;

export type TerrainType =
  | "cursedForest"
  | "deadLand"
  | "hollyLand"
  | "magicForest"
  | "mountain"
  | "desert"
  | "forest"
  | "steppe"
  | "dungeon";

// ================ UI =================

export type KingdomUI = {
  id: ServerId;
  fields: {
    id: ServerId;
    terrain: TerrainType;
    domains: Record<FieldLayer, DomainUI | null>;
  }[];
};

export type TerrainTile =
  | "cursedForest_1"
  | "cursedForest_2"
  | "cursedForest_3"
  | "cursedForest_4"
  | "deadLand_1"
  | "deadLand_2"
  | "deadLand_3"
  | "deadLand_4"
  | "deadLand_5"
  | "hollyLand_1"
  | "hollyLand_2"
  | "hollyLand_3"
  | "hollyLand_4"
  | "hollyLand_5"
  | "magicForest_1"
  | "magicForest_2"
  | "magicForest_3"
  | "magicForest_4"
  | "magicForest_5"
  | "mountain_1"
  | "mountain_2"
  | "mountain_3"
  | "mountain_4"
  | "mountain_5"
  | "desert_1"
  | "desert_2"
  | "desert_3"
  | "desert_4"
  | "desert_5"
  | "forest_1"
  | "forest_2"
  | "forest_3"
  | "forest_4"
  | "forest_5"
  | "steppe_1"
  | "steppe_2"
  | "steppe_3"
  | "steppe_4"
  | "dungeon_1"
  | "dungeon_2";
