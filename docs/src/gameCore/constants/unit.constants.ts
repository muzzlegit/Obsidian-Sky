export const UNIT_TYPES_LIST = [
  "porter",
  "swordsman",
  "cavalier",
  "flying",
  "archer",
  "healer",
  "mercenary",
  "mage",
] as const;

export const COMMON_UNIT_PROPERTIES = {
  attackMultiplier: 0,
  healthMultiplier: -0.5,
  defense: 0,
  defenseLimit: 0,
};

const WARRIOR_UNIT_ADDITION_PROPERTIES = {
  persecutionMultiplier: 0,
  terrainModification: 0,
};

export const ADDITION_UNIT_PROPERTIES = {
  porter: {
    capacityMultiplier: 0,
  },
  swordsman: WARRIOR_UNIT_ADDITION_PROPERTIES,
  cavalier: WARRIOR_UNIT_ADDITION_PROPERTIES,
  flying: WARRIOR_UNIT_ADDITION_PROPERTIES,
  archer: WARRIOR_UNIT_ADDITION_PROPERTIES,
  healer: {
    perfectResurrection: 0,
    additionalResurrection: 0,
    resurrectionMultiplier: 0,
    resurrectionLimit: 0,
    finishingOff: 0,
  },
  mercenary: {},
  mage: {
    roundAttackMultiplier: 0,
    suppression: 0,
    towersSuppressionMultiplier: 0,
  },
};
