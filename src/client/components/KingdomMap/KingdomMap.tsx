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
  const { kingdomFields, coordinates, handleDecreaseCoordinate, handleIncreaseCoordinate } =
    useKingdom();
  const kingdomsFields = useGameStore((state) => state.kingdomsFields);
  const ruins = useGameStore((state) => state.ruins);

  return (
    <div className={styles.container}>
      <div className={styles.map}>
        {kingdomFields.map((field, index) => {
          const worldDomain = field.domains.world;
          return (
            <div
              key={field.id}
              style={{ backgroundColor: colors[field.terrain] }}
              className={styles.field}
            >
              {worldDomain ? (
                <div
                  style={{
                    backgroundColor:
                      ruins[worldDomain.id].behavior !== 'aggressive' ? 'darkkhaki' : 'red',
                  }}
                  className={styles.ruin}
                >
                  <span>{ruins[worldDomain.id].level}</span>
                  {ruins[worldDomain.id].isHero ? <div className={styles.dome} /> : null}
                </div>
              ) : null}
              <div className={styles.fieldIndex}>{index + 1}</div>
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
