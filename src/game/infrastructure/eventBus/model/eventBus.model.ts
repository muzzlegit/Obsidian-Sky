type Listener<T> = (payload: T) => void;

export function createEventBus<Events extends Record<string, unknown>>() {
  const events = new Map<keyof Events, Set<Listener<any>>>();

  function on<K extends keyof Events>(event: K, listener: Listener<Events[K]>) {
    if (!events.has(event)) {
      events.set(event, new Set());
    }

    events.get(event)!.add(listener);

    return () => off(event, listener);
  }

  function off<K extends keyof Events>(event: K, listener: Listener<Events[K]>) {
    events.get(event)?.delete(listener);
  }

  function emit<K extends keyof Events>(event: K, payload: Events[K]) {
    if (import.meta.env.DEV) {
      console.debug(`🟣 Event: ${String(event)}`, payload);
    }

    events.get(event)?.forEach((listener) => {
      listener(payload);
    });
  }

  function clear(event?: keyof Events) {
    if (event) {
      events.delete(event);
      return;
    }

    events.clear();
  }

  return {
    on,
    off,
    emit,
    clear,
  };
}
