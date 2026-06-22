type Listener<T> = (payload: T) => void;

export function createEvents<TEvents extends Record<string, any>>() {
  const listeners = new Map();

  return {
    on<K extends keyof TEvents>(event: K, listener: Listener<TEvents[K]>) {
      if (!listeners.has(event)) {
        listeners.set(event, new Set());
      }

      listeners.get(event).add(listener);
    },

    emit<K extends keyof TEvents>(event: K, payload: TEvents[K]) {
      listeners.get(event)?.forEach((listener: any) => listener(payload));
    },
  };
}
