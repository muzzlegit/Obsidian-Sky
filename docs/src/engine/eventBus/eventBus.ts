// event-bus.ts
type Listener<T> = (payload: T) => void;

export function createEventBus<
  Events extends Record<string, any>,
  Queries extends Record<string, any>,
  QueryResults extends { [K in keyof Queries]: any }
>() {
  const events = new Map<keyof Events, Set<Listener<any>>>();
  const queries = new Map<keyof Queries, (payload: any) => any>();

  // --- EVENTS ---
  function on<K extends keyof Events>(event: K, listener: Listener<Events[K]>) {
    if (!events.has(event)) events.set(event, new Set());
    events.get(event)!.add(listener);
  }

  function off<K extends keyof Events>(
    event: K,
    listener: Listener<Events[K]>
  ) {
    events.get(event)?.delete(listener);
  }

  function emit<K extends keyof Events>(event: K, payload: Events[K]) {
    if (import.meta.env.DEV)
      console.debug(`🟣 Event: ${String(event)}`, payload);
    events.get(event)?.forEach((listener) => listener(payload));
  }

  // --- QUERIES ---
  function registerQuery<K extends keyof Queries>(
    query: K,
    handler: Queries[K] extends undefined
      ? () => QueryResults[K]
      : (payload: Queries[K]) => QueryResults[K]
  ) {
    queries.set(query, handler as any);
  }

  function query<K extends keyof Queries>(
    query: K,
    payload: Queries[K]
  ): QueryResults[K];
  function query<K extends keyof Queries>(
    query: K
  ): Queries[K] extends undefined ? QueryResults[K] : never;

  function query<K extends keyof Queries>(query: K, payload?: any) {
    const handler = queries.get(query);
    if (!handler)
      throw new Error(`❌ Query handler for "${String(query)}" not registered`);
    return handler(payload);
  }

  return { on, off, emit, registerQuery, query };
}
