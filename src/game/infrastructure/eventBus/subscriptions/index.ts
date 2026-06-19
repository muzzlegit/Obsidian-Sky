import { EVENT_BUS } from '../eventBus';
import { registerRuinSubscriptions } from './ruin.subscriptions';

export function registerGameSubscriptions() {
  registerRuinSubscriptions(EVENT_BUS);
}
