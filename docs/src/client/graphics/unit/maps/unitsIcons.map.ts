export const unitsIconsMap = {
  porter: {
    coordinate: "-1px -1px",
    width: "22px",
    height: "22px",
  },
  swordsman: {
    coordinate: "-1px -24px",
    width: "22px",
    height: "22px",
  },
  cavalier: {
    coordinate: "-1px -47px",
    width: "22px",
    height: "22px",
  },
  flying: {
    coordinate: "-1px -70px",
    width: "22px",
    height: "22px",
  },
  archer: {
    coordinate: "-24px -1px",
    width: "22px",
    height: "22px",
  },
  healer: {
    coordinate: "-24px -24px",
    width: "22px",
    height: "22px",
  },
  mercenary: {
    coordinate: "-24px -47px",
    width: "22px",
    height: "22px",
  },
  mage: {
    coordinate: "-24px -70px",
    width: "22px",
    height: "22px",
  },
  amount: {
    coordinate: "-47px -69px",
    width: "16px",
    height: "16px",
  },
  attack: {
    coordinate: "-47px -1px",
    width: "16px",
    height: "16px",
  },
  defense: {
    coordinate: "-47px -18px",
    width: "16px",
    height: "16px",
  },
  defenseLevel: {
    coordinate: "-47px -52px",
    width: "16px",
    height: "16px",
  },
  health: {
    coordinate: "-47px -35px",
    width: "16px",
    height: "16px",
  },
  capacity: {
    coordinate: "-64px -1px",
    width: "16px",
    height: "16px",
  },
  resurrection: {
    coordinate: "-64px -18px",
    width: "16px",
    height: "16px",
  },
  towersSuppression: {
    coordinate: "-64px -35px",
    width: "16px",
    height: "16px",
  },
  suppression: {
    coordinate: "-64px -70px",
    width: "16px",
    height: "16px",
  },
  persecutionRate: {
    coordinate: "-64px -52px",
    width: "16px",
    height: "16px",
  },
} as const;

export type UnitsIconsMapType = keyof typeof unitsIconsMap;
