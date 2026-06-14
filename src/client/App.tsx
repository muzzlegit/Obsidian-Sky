import { startServer } from '#/server/server';
import { KingdomMap } from './components/KingdomMap/KingdomMap';
import { useServerData } from './useServerData';

const gameData = await startServer();
export const App = () => {
  console.info('RENDER:[App]');

  useServerData(gameData);
  return <div style={{ height: '100%' }}>{/* <KingdomMap /> */}</div>;
};
