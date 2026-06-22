import { registerGameSubscriptions } from '#/game/infrastructure/eventBus/subscriptions';
import { ruinSpawnSystem } from '#/game/systems/ruinSpawnSystem';
import { startServer } from '#/server/server';
import { runPeriodically } from '#/shared/utils/runPeriodically';
import { KingdomMap } from './components/KingdomMap/KingdomMap';
import { useServerData } from './useServerData';

const gameData = startServer();
registerGameSubscriptions();
runPeriodically(ruinSpawnSystem, 60, true);

export const App = () => {
  console.info('RENDER:[App]');
  useServerData(gameData);

  return <div style={{ height: '100%' }}>{<KingdomMap />}</div>;
};
