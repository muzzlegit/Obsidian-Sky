import { kingdomService } from '#/game/domain/kingdom/kingdom.service';
import { ruinService } from '#/game/domain/ruin/ruin.service';

export function registerRuinSubscriptions(eventBus) {
  eventBus.on('ruin:spawned', ({ ruin, location }) => {
    ruinService.addRuinToStore(ruin);
    kingdomService.addDomainToKingdom({
      domain: ruin,
      location,
    });
  });

  eventBus.on('ruin:expired', ({ ruinId, location }) => {
    ruinService.removeRuinFromStore(ruinId);
    kingdomService.removeDomainFromKingdom({
      domainId: ruinId,
      location,
    });
  });
}
