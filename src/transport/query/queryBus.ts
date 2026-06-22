export function createQueryBus<
  Queries extends Record<
    string,
    {
      request: any;
      response: any;
    }
  >,
>(handlers: {
  [K in keyof Queries]: (payload: Queries[K]['request']) => Queries[K]['response'];
}) {
  return {
    query<K extends keyof Queries>(name: K, payload: Queries[K]['request']) {
      return handlers[name](payload);
    },
  };
}
