import * as commands from './kingdom.commands';
import * as queries from './kingdom.queries';

export const kingdomService = {
  ...queries,
  ...commands,
};
