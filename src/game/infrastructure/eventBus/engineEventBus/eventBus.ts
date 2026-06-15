import { createEventBus } from '../eventBus.model.ts';
import type { engineEvents } from './events.ts';
import type { engineQueries, engineQueriesResults } from './queries.ts';

export const EVENT_BUS = createEventBus<engineEvents, engineQueries, engineQueriesResults>();


