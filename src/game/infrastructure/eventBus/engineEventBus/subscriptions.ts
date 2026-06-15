import { kingdomEntity } from '#/game/domain/kingdom/kingdom.entity';
import { kingdomService } from '#/game/domain/kingdom/kingdom.service';
import { ruinService } from '#/game/domain/ruin/ruin.service';
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
  });
}
