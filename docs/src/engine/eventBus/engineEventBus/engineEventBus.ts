import { createEventBus } from "../eventBus";
import type { engineEvents } from "./events/events";
import type {
  engineQueries,
  engineQueriesResults,
} from "./subscriptions/queries";

export const engineEventBus = createEventBus<
  engineEvents,
  engineQueries,
  engineQueriesResults
>();
