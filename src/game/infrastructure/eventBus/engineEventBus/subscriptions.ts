import { kingdomEntity } from '#/game/domain/kingdom/kingdom.entity';
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
  // RUIN
  EVENT_BUS.on('ruin:spawned', ({ ruin, fieldId }) => {
    ruinService.addRuinToStore(ruin);
    kingdomService.addDomainToKingdom(fieldId, kingdomEntity.toDomainRef(ruin));
    timedDomainService.addTimedDomainToStore({
      id: ruin.id,
      type: ruin.type,
      lifeTime: ruin.lifeTime,
    });
  });
  EVENT_BUS.on('ruin:expired', ({ ruin, fieldId }) => {
    ruinService.removeRuinFromStore(ruin.id);
    kingdomService.removeDomainFromKingdom(fieldId, ruin);
    timedDomainService.removeTimedDomainFromStore(ruin['id']);
  });
}
