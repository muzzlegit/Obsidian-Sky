import { indexedDBStorage } from "@engine/store/indexedDBStorage";
import {
  mutate,
  overwriteState,
  select,
  type RootState,
} from "@engine/store/store";
import { generateTestKigdoms } from "@utils/testEnvironment/TestEnvironment";

// import { ruinsSpawnSystem } from "@engine/systems/ruinsSpawnSystem";
// import { timedDomainsSystem } from "@engine/systems/timedDomainsSystem";
// import { runControlledInterval } from "@utils/helpers";
//*ПІДПИСКИ НА ПОДІЇ
import "@engine/eventBus/engineEventBus/subscriptions";

/**
 * Функція запуску гри. Завантажує дані серверу з БД та запускає всі системи
 *
 */
export async function startGame() {
  // ЗАВАНТАЖУЄМО ДАНІ З БД
  const server: RootState = await indexedDBStorage.getItem("server");
  if (!server) {
    console.error(
      "SERVER_ERROR: Не вдалось завантажити сервер з БД. Завантажено стартове середовище"
    );

    //TODO: замініти стартове середовище
    const kingdoms = generateTestKigdoms();
    mutate((state) => (state.kingdoms = kingdoms));
    console.log("load test");
  } else {
    overwriteState(server);
    console.log("load DATA");
  }
  console.log(
    "server",
    select((state) => state.kingdoms)
  );

  // ЗАПУСКАЄМО КОНТРОЛЛЕР РУЇН НА СЕРВЕРІ

  // runControlledInterval(3000, ruinsSpawnSystem);
  // runControlledInterval(1000, timedDomainsSystem);
}
