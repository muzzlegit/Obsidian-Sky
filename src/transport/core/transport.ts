export function createTransport<
  T extends {
    query: Record<string, { input: any; output: any }>;
    command: Record<string, { input: any; output: any }>;
    event: Record<string, any>;
  },
>() {
  return {} as {
    query: {
      [K in keyof T['query']]: (input: T['query'][K]['input']) => Promise<T['query'][K]['output']>;
    };

    command: {
      [K in keyof T['command']]: (
        input: T['command'][K]['input'],
      ) => Promise<T['command'][K]['output']>;
    };

    event: {
      on: {
        [K in keyof T['event']]: (handler: (payload: T['event'][K]) => void) => void;
      };
    };
  };
}
