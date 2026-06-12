import { useKingdom } from '#/client/useKingdom';
import { useGameStore } from '#/store/gameStore';
import { MapNavigator } from '../CoordinateStepper/MapNavigator';
import styles from './KingdomMap.module.css';

const colors = {
  cursedForest: 'darkgray',
  deadLand: 'red',
  hollyLand: 'green',
  magicForest: 'aquamarine',
  mountain: 'gray',
  desert: 'yellow',
  forest: 'darkgreen',
  steppe: 'orange',
  dungeon: 'brown',
};

export const KingdomMap = () => {
  console.info('RENDER:[KingdomMap]');
  const { kingdom, coordinates, handleDecreaseCoordinate, handleIncreaseCoordinate } = useKingdom();
  const kingdomsFields = useGameStore((state) => state.kingdomsFields);
  if (!kingdom) return;

  return (
    <div className={styles.container}>
      <div className={styles.map}>
        {kingdom.fieldsIds.map((field, index) => {
          return (
            <div
              key={field}
              style={{ backgroundColor: colors[kingdomsFields[field].terrain] }}
              className={styles.field}
            >
              <div>{index + 1}</div>
            </div>
          );
        })}
      </div>
      <MapNavigator
        value={coordinates}
        onDecrease={handleDecreaseCoordinate}
        onIncrease={handleIncreaseCoordinate}
      />
    </div>
  );
};
