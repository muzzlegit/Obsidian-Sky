import { useGameStore } from '#/store/gameStore';
import type { engineEvents } from '../eventBus/events/events';
import type { Task, TaskType } from './scheduler.types';

let schedulerTimeoutId = null;

export function reschedule() {
  console.log('[SCHEDULER][reschedule]');
  // Очищаємо попередній таймер, якщо він був (захист від дублювання)
  if (schedulerTimeoutId) {
    clearTimeout(schedulerTimeoutId);
    schedulerTimeoutId = null;
  }

  // Отримуємо список активних завдань
  const activeTasks = useGameStore.getState().scheduler;
  if (activeTasks.length === 0) return;

  // Шукаємо задачу з найменшим часом життя
  let closestTask = activeTasks[0];
  for (let i = 1; i < activeTasks.length; i++) {
    if (closestTask[i].expiresAt < closestTask.expiresAt) {
      closestTask = activeTasks[i];
    }
  }
  // Рахуємо, скільки мілісекунд залишилося до зникнення найближчого
  const delay = closestTask.expiresAt - Date.now();

  // Додаємо мізерний запас у 10-50мс, щоб гарантувати, що час точно перешагнув дедлайн
  const safeDelay = Math.max(delay + 20, 0);

  // Запускаємо функцію по колу через прорахований час
  schedulerTimeoutId = setTimeout(() => {
    processExpiredTasks;
  }, safeDelay);
}

function processExpiredTasks() {
  const tasksList = useGameStore.getState().scheduler;

  if (!tasksList.length) return;

  const now = Date.now();

  const expiredTasks = tasksList.filter((d) => d.expiresAt <= now);

  reschedule();
}

function addTask(taskType: TaskType, payload: Task['payload']) {
  
}

export const schedulerService = {
  reschedule,
  processExpiredTasks,
};
