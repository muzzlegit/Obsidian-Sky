/**
 * Запускає функцію через рівні проміжки часу.
 *
 * @param callback Функція для виконання.
 * @param intervalM Інтервал у секундах.
 * @param immediate Виконати перший запуск одразу.
 * @returns Функція зупинки.
 */
export function runPeriodically(
  callback: () => void,
  intervalSec: number,
  immediate = false,
) {
  let timeoutId: ReturnType<typeof setTimeout>;

  const run = () => {
    callback();
    timeoutId = setTimeout(run, intervalSec *1000);
  };

  if (immediate) {
    run();
  } else {
    timeoutId = setTimeout(run, intervalSec *1000);
  }

  return () => clearTimeout(timeoutId);
}