import type { engineEvents } from './events/events.ts';
import { createEventBus } from './model/eventBus.model.ts';

export const EVENT_BUS = createEventBus<engineEvents>();
