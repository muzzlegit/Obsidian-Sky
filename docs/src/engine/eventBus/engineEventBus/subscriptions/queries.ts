import type { Domain, Kingdom, Ruin, TimedDomain } from "@engine/sharedBridge";

export type engineQueries = {
  //SERVER
  "server:getDomain": {
    domainId: Domain["id"];
    domainType: Domain["type"];
  };

  // KINGDOM
  "kingdom:getKingdoms": undefined;
  "kingdom:getKingdomsIdList": undefined;
  "kingdom:getKingdom": number;
  "kingdom:getKingdomById": Kingdom["id"];
  "kingdom:getRequiredRuinsForKingdom": number;
  // RUIN
  "ruin:isRuinExists": Ruin["id"];
  "ruin:getRuinById": Ruin["id"];
  "ruin:getRuinLifeTime": Ruin["id"];
  "ruin:getRuinLocation": Ruin["id"];
  // TIMED DOMAIN
  "timedDomains:getTimedDomains": undefined;
};

export type engineQueriesResults = {
  //SERVER
  "server:getDomain": Domain | null;
  //KINGDOM
  "kingdom:getKingdoms": Kingdom[];
  "kingdom:getKingdomsIdList": Kingdom["id"][];
  "kingdom:getKingdom": Kingdom | null;
  "kingdom:getKingdomById": Kingdom | null;
  "kingdom:getRequiredRuinsForKingdom": number | false;
  // RUIN
  "ruin:isRuinExists": boolean;
  "ruin:getRuinById": Ruin | null;
  "ruin:getRuinLifeTime": Ruin["lifeTime"] | null;
  "ruin:getRuinLocation": Ruin["location"] | null;
  // TIMED DOMAIN
  "timedDomains:getTimedDomains": TimedDomain[];
};
