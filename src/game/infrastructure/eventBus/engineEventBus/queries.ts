import type {
  Domain,
  DomainLocation,
  FieldDomainPlace,
  Kingdom,
  KingdomField,
  KingdomFields,
  TimedDomain,
  WorldKingdoms,
} from '#/game/domain/game.public';

export type engineQueries = {
  // KINGDOM
  'kingdom:getKingdomsStore': undefined;
  'kingdom:getFieldsStore': undefined;
  'kingdom:getField': KingdomField['id'];
  'kingdom:getKingdomFields': Kingdom['id'];
  'kingdom:getDomain': DomainLocation;
  'kingdom:pickRandomAvailableFieldId': { kingdomId: Kingdom['id']; layer: FieldDomainPlace };
  // TIMED DOMAIN
  'timedDomains:getTimedDomainsStore': undefined;
};

export type engineQueriesResults = {
  //KINGDOM
  'kingdom:getKingdomsStore': WorldKingdoms;
  'kingdom:getFieldsStore': KingdomFields;
  'kingdom:getField': KingdomField;
  'kingdom:getKingdomFields': KingdomField[];
  'kingdom:getDomain': Domain;
  'kingdom:pickRandomAvailableFieldId': KingdomField['id'] | undefined;
  // TIMED DOMAINS
  'timedDomains:getTimedDomainsStore': TimedDomain[];
};
