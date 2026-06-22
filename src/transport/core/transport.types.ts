import type { Kingdom, KingdomField, WorldKingdoms } from '#/game/domain/game.public';

export type QueryDef<Input, Output> = {
  input: Input;
  output: Output;
};

export type CommandDef<Input, Output> = {
  input: Input;
  output: Output;
};
export type AppRouter = {
  query: {
    getKingdomsIds: QueryDef<void, WorldKingdoms>;

    getKingdomFields: QueryDef<Kingdom['id'], Omit<KingdomField, 'kingdomId'>[]>;
  };

  command: {
    attackRuin: CommandDef<{ ruinId: string }, void>;
  };

  event: {
    ruinRemoved: {
      ruinId: string;
    };
  };
};
