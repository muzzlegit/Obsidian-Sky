type MapNavigatorProps = {
  value: {
    x: number;
    y: number;
  };
  onIncrease: (key: 'x' | 'y') => void;
  onDecrease: (key: 'x' | 'y') => void;
};

export const MapNavigator = ({ value, onIncrease, onDecrease }: MapNavigatorProps) => {
  return (
    <div>
      <div>
        <button onClick={() => onIncrease('x')}>+</button>
        <span>{value.x}</span>
        <button onClick={() => onDecrease('x')}>-</button>
      </div>
      <div>
        <button onClick={() => onIncrease('y')}>+</button>
        <span>{value.y}</span>
        <button onClick={() => onDecrease('y')}>-</button>
      </div>
    </div>
  );
};
