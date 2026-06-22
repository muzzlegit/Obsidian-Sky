import { commands } from './transport.commands';
import { createEvents } from './transport.events';
import { queries } from './transport.queries';

export const transport = {
  query: queries,

  command: commands,

  // event: createEvents()<Events>(),
};
