export function createCommandBus<Commands>(handlers: {
  [K in keyof Commands]: (payload: Commands[K]['request']) => Promise<Commands[K]['response']>;
}) {
  return {
    async command<K extends keyof Commands>(name: K, payload: Commands[K]['request']) {
      return handlers[name](payload);
    },
  };
}
