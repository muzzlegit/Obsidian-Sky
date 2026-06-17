import { registerGameEvents } from '#/game/infrastructure/eventBus/engineEventBus/subscriptions';
import { ruinSpawnSystem } from '#/game/systems/ruinSpawnSystem';
import { timedDomainSystem } from '#/game/systems/timedDomainSystem';
import { startServer } from '#/server/server';
import { runControlledInterval } from '#/shared/utils/runControlledInterval';
import { useGameStore } from '#/store/gameStore';
import { useEffect } from 'react';
import { KingdomMap } from './components/KingdomMap/KingdomMap';
import { useServerData } from './useServerData';

const gameData = startServer();
useServerData(gameData);
registerGameEvents();
// ruinSpawnSystem();
// timedDomainSystem();
runControlledInterval(40000, ruinSpawnSystem);

export const App = () => {
  console.info('RENDER:[App]');

  useTimedDomainSystem();

  return <div style={{ height: '100%' }}>{<KingdomMap />}</div>;
};

const useTimedDomainSystem = () => {
  const f = useGameStore((state) => state.timedDomains);

  useEffect(() => {
    timedDomainSystem();
  }, [f]);
};
