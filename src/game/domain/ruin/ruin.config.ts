import type { Unit } from '../unit/unit.types';

export type SquadUnitConfig = {
  countMin: number;
  countMax: number;
  level: Unit['level'];
};

export type RuinConfig = typeof ruinConfig;
export const ruinConfig = {
  1: {
    lifeTime: 500000,
    obsidian: { min: 1, max: 5 },
    squad: {
      porter: {
        countMin: 90,
        countMax: 180,
        level: 1,
      },
      swordsman: {
        countMin: 130,
        countMax: 210,
        level: 1,
      },
      cavalier: {
        countMin: 50,
        countMax: 90,
        level: 1,
      },
    },
    resources: {
      gold: 100,
      wood: 100,
      stone: 100,
      grain: 100,
      iron: 100,
      population: 100,
    },
  },
  2: {
    lifeTime: 800000,
    obsidian: { min: 1, max: 10 },
    squad: {
      porter: {
        countMin: 100,
        countMax: 300,
        level: 1,
      },
      cavalier: {
        countMin: 120,
        countMax: 230,
        level: 2,
      },
      flying: {
        countMin: 80,
        countMax: 180,
        level: 1,
      },
    },
    resources: {
      gold: 200,
      wood: 200,
      stone: 200,
      grain: 200,
      iron: 200,
      population: 100,
    },
  },
  3: {
    lifeTime: 1200000,
    obsidian: { min: 1, max: 15 },
    squad: {
      porter: {
        countMin: 380,
        countMax: 520,
        level: 2,
      },
      flying: {
        countMin: 150,
        countMax: 300,
        level: 2,
      },
      archer: {
        countMin: 50,
        countMax: 120,
        level: 1,
      },
      healer: {
        countMin: 140,
        countMax: 230,
        level: 1,
      },
      mercenary: {
        countMin: 540,
        countMax: 800,
        level: 1,
      },
      mage: {
        countMin: 60,
        countMax: 110,
        level: 1,
      },
    },
    resources: {
      gold: 300,
      wood: 300,
      stone: 300,
      grain: 300,
      iron: 300,
      population: 300,
    },
  },
  4: {
    lifeTime: 2000000,
    obsidian: { min: 1, max: 20 },
    squad: {
      porter: {
        countMin: 580,
        countMax: 850,
        level: 3,
      },
      swordsman: {
        countMin: 650,
        countMax: 1000,
        level: 2,
      },

      archer: {
        countMin: 180,
        countMax: 320,
        level: 2,
      },
      healer: {
        countMin: 180,
        countMax: 280,
        level: 2,
      },
      mercenary: {
        countMin: 900,
        countMax: 2400,
        level: 2,
      },
      mage: {
        countMin: 310,
        countMax: 560,
        level: 2,
      },
    },
    resources: {
      gold: 400,
      wood: 400,
      stone: 400,
      grain: 400,
      iron: 400,
      population: 400,
    },
  },
  5: {
    lifeTime: 2500000,
    obsidian: { min: 1, max: 25 },
    squad: {
      porter: {
        countMin: 8000,
        countMax: 12000,
        level: 3,
      },
      healer: {
        countMin: 700,
        countMax: 1800,
        level: 3,
      },
      mercenary: {
        countMin: 15000,
        countMax: 45000,
        level: 3,
      },
      mage: {
        countMin: 800,
        countMax: 2000,
        level: 3,
      },
    },
    resources: {
      gold: 500,
      wood: 500,
      stone: 500,
      grain: 500,
      iron: 500,
      population: 500,
    },
  },
  6: {
    lifeTime: 3000000,
    obsidian: { min: 1, max: 100 },
    squad: {
      porter: {
        countMin: 1,
        countMax: 1,
        level: 3,
      },
      healer: {
        countMin: 1,
        countMax: 1,
        level: 3,
      },
      mercenary: {
        countMin: 1,
        countMax: 1,
        level: 3,
      },
      mage: {
        countMin: 1,
        countMax: 1,
        level: 3,
      },
    },
    resources: {
      gold: 600,
      wood: 600,
      stone: 600,
      grain: 600,
      iron: 600,
      population: 600,
    },
  },
  7: {
    lifeTime: 100,
    obsidian: { min: 20000, max: 50000 },
    squad: {
      porter: {
        countMin: 1,
        countMax: 1,
        level: 3,
      },
      healer: {
        countMin: 1,
        countMax: 1,
        level: 3,
      },
      mercenary: {
        countMin: 1,
        countMax: 1,
        level: 3,
      },
      mage: {
        countMin: 1,
        countMax: 1,
        level: 3,
      },
    },
    resources: {
      gold: 700,
      wood: 700,
      stone: 700,
      grain: 700,
      iron: 700,
      population: 700,
    },
  },
} as const;
