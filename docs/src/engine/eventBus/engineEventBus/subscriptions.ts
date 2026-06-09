import {
  getKingdom,
  getKingdomById,
  getKingdoms,
  getKingdomsIdList,
  getRequiredRuinsForKingdom,
  removeRuinFromKingdom,
} from "@engine/services/kingdom.service";
import {
  getRuinById,
  getRuinLifeTime,
  getRuinLocation,
  isRuinExists,
  removeRuin,
} from "@engine/services/ruin.service";
import { getDomainById } from "@engine/services/server.service";
import {
  addRuinToTimedDomain,
  getTimedDomains,
} from "@engine/services/timedDomain.service";
import { engineEventBus } from "./engineEventBus";
// SERVER
engineEventBus.registerQuery("server:getDomain", getDomainById);
// KINGDOM
engineEventBus.registerQuery("kingdom:getKingdoms", getKingdoms);
engineEventBus.registerQuery("kingdom:getKingdomsIdList", getKingdomsIdList);
engineEventBus.registerQuery("kingdom:getKingdom", getKingdom);
engineEventBus.registerQuery("kingdom:getKingdomById", getKingdomById);
engineEventBus.registerQuery(
  "kingdom:getRequiredRuinsForKingdom",
  getRequiredRuinsForKingdom
);
// RUIN
engineEventBus.on("ruin:expired", removeRuin);
engineEventBus.on("ruin:removed", removeRuinFromKingdom);
engineEventBus.registerQuery("ruin:isRuinExists", isRuinExists);
engineEventBus.registerQuery("ruin:getRuinLifeTime", getRuinLifeTime);
engineEventBus.registerQuery("ruin:getRuinLocation", getRuinLocation);
engineEventBus.registerQuery("ruin:getRuinById", getRuinById);
// TIMED DOMAIN
engineEventBus.on("ruin:spawned", addRuinToTimedDomain);
engineEventBus.registerQuery("timedDomains:getTimedDomains", getTimedDomains);
