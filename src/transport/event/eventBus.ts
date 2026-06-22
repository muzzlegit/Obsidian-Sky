

export function createEventBus<Events>() {
  const listeners = new Map<
    keyof Events,
    Set<(payload: any) => void>
  >();

  function on<K extends keyof Events>(
    event: K,
    handler: (payload: Events[K]) => void,
  ) {
    if (!listeners.has(event)) {
      listeners.set(event, new Set());
    }

    listeners.get(event)!.add(handler);

    return () => {
      listeners.get(event)!.delete(handler);
    };
  }

  function emit<K extends keyof Events>(
    event: K,
    payload: Events[K],
  ) {
    listeners
      .get(event)
      ?.forEach(fn => fn(payload));
  }

  return { on, emit };
}