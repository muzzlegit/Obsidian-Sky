/**
 * Запускає періодичне виконання callback з контролем одночасних викликів.
 * Якщо callback async і виконується довше за інтервал — наступний запуск чекатиме завершення.
 *
 * @param intervalMs - інтервал у мс між викликами
 * @param callback - функція, яку потрібно викликати (може бути async)
 * @param options - додаткові налаштування
 * @param options.returnStop - чи повертати функцію для зупинки (default: false)
 * @param options.immediate - чи запускати перший виклик одразу (default: true)
 *
 * @returns Функція stop() якщо returnStop=true, інакше нічого.
 *
 * @example
 * const stop = runControlledInterval(5000, async () => {
 *   await maintainRuins();
 * });
 *
 * // Зупинити через 30 сек
 * setTimeout(stop, 30000);
 */
export function runControlledInterval(
  intervalMs: number,
  callback: () => void | Promise<void>,
  options: { returnStop?: boolean; immediate?: boolean } = {},
): (() => void) | void {
  const { returnStop = true, immediate = true } = options;

  let active = false;
  let timerId: ReturnType<typeof setInterval> | null = null;

  async function runner() {
    if (active) return;
    active = true;
    try {
      await callback();
    } finally {
      active = false;
    }
  }

  if (immediate) {
    runner();
  }

  timerId = setInterval(runner, intervalMs);

  if (returnStop) {
    return () => {
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }
    };
  }
}
