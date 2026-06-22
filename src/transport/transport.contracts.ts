import type { Kingdom, KingdomField, WorldKingdoms } from '#/game/domain/game.public';

export interface Queries {
  getKingdomFields: (kingdomId: Kingdom['id']) => Omit<KingdomField, 'kingdomId'>[];

  getKingdomsIds: () => WorldKingdoms;
}

export interface Commands {
  attackRuin: (ruinId: string) => void;

  buildMine: (cityId: string) => void;
}

export interface Events {
  ruinRemoved: {
    ruinId: string;
  };

  armyArrived: {
    armyId: string;
  };
}
