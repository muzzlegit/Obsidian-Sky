import { startServer } from '#/server/server';
import { KingdomMap } from './components/KingdomMap/KingdomMap';
import { useServerData } from './useServerData';

export const App = () => {
  console.info('RENDER:[App]');

  const gameData = startServer();

  useServerData(gameData);
  return (
    <div style={{ height: '100%' }}>
      <KingdomMap />
    </div>
  );
};
