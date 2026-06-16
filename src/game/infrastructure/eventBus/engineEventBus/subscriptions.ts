import { kingdomService } from '#/game/services/kingdom.service';
import { ruinService } from '#/game/services/ruin.service';
import { timedDomainService } from '#/game/services/timedDomain.service';
import { EVENT_BUS } from './eventBus';

export function registerGameEvents() {
  // KINGDOM
  EVENT_BUS.registerQuery('kingdom:getKingdomsStore', kingdomService.getKingdomsStore);
  EVENT_BUS.registerQuery('kingdom:getFieldsStore', kingdomService.getFieldsStore);
  EVENT_BUS.registerQuery('kingdom:getKingdomFields', kingdomService.getKingdomFields);
  EVENT_BUS.registerQuery('kingdom:getField', kingdomService.getField);
  EVENT_BUS.registerQuery(
    'kingdom:pickRandomAvailableFieldId',
    kingdomService.pickRandomAvailableFieldId,
  );
  EVENT_BUS.registerQuery('kingdom:getDomain', kingdomService.getDomain);
  // TIMED DOMAINS
  EVENT_BUS.registerQuery(
    'timedDomains:getTimedDomainsStore',
    timedDomainService.getTimedDomainsStore,
  );
  // RUIN
  EVENT_BUS.on('ruin:spawned', ({ ruin, location }) => {
    ruinService.addRuinToStore(ruin);
    kingdomService.addDomainToKingdom({
      domain: ruin,
      location,
    });
    timedDomainService.addTimedDomainToStore({ domainEntity: ruin, location });
  });

  EVENT_BUS.on('ruin:expired', ({ ruinId, location }) => {
    ruinService.removeRuinFromStore(ruinId);
    kingdomService.removeDomainFromKingdom({
      domainId: ruinId,
      location,
    });
    timedDomainService.removeTimedDomainFromStore(ruinId);
  });
}
