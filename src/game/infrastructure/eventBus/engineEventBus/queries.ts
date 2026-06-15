import type {
  FieldDomainPlace,
  Kingdom,
  KingdomField,
  KingdomFields,
  WorldKingdoms,
} from '#/game/domain/game.public';

export type engineQueries = {
  // KINGDOM
  'kingdom:getKingdomsStore': undefined;
  'kingdom:getFieldsStore': undefined;
  'kingdom:getField': KingdomField['id'];
  'kingdom:getKingdomFields': Kingdom['id'];
  'kingdom:pickRandomAvailableFieldId': { kingdomId: Kingdom['id']; layer: FieldDomainPlace };
};

export type engineQueriesResults = {
  //KINGDOM
  'kingdom:getKingdomsStore': WorldKingdoms;
  'kingdom:getFieldsStore': KingdomFields;
  'kingdom:getField': KingdomField;
  'kingdom:getKingdomFields': KingdomField[];
  'kingdom:pickRandomAvailableFieldId': KingdomField['id'] | undefined;
};
