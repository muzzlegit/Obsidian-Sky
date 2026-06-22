Типи подій
export enum ScheduledEventType {
  BuildingCompleted = "BuildingCompleted",
  ResearchCompleted = "ResearchCompleted",
  ArmyArrived = "ArmyArrived",
  ArmyReturned = "ArmyReturned",
  RuinSpawned = "RuinSpawned",
  RuinExpired = "RuinExpired",
}
Payload для кожної події

Тут головна ідея — TypeScript сам знає який payload належить якій події.

export interface EventPayloadMap {
  [ScheduledEventType.BuildingCompleted]: {
    cityId: string;
    buildingType: string;
  };

  [ScheduledEventType.ResearchCompleted]: {
    cityId: string;
    researchType: string;
  };

  [ScheduledEventType.ArmyArrived]: {
    armyId: string;
  };

  [ScheduledEventType.ArmyReturned]: {
    armyId: string;
  };

  [ScheduledEventType.RuinSpawned]: {
    ruinId: string;
  };

  [ScheduledEventType.RuinExpired]: {
    ruinId: string;
  };
}
Базовий тип події
export type ScheduledEvent<
  T extends ScheduledEventType = ScheduledEventType,
> = {
  id: string;

  type: T;

  executeAt: Date;

  payload: EventPayloadMap[T];
};
Створення події

Тепер TypeScript перевіряє payload автоматично.

const event: ScheduledEvent<ScheduledEventType.BuildingCompleted> = {
  id: crypto.randomUUID(),

  type: ScheduledEventType.BuildingCompleted,

  executeAt: new Date(Date.now() + 5 * 60 * 1000),

  payload: {
    cityId: "city-1",
    buildingType: "goldMine",
  },
};

Помилка:

payload: {
  armyId: "123";
}

бо для BuildingCompleted потрібні cityId і buildingType.

Handler-и

Зручно зробити окремий handler на кожен тип.

type EventHandler<T extends ScheduledEventType> = (
  payload: EventPayloadMap[T],
) => Promise<void>;
const handlers: {
  [K in ScheduledEventType]: EventHandler<K>;
} = {
  BuildingCompleted: async payload => {
    console.log(payload.cityId);
  },

  ResearchCompleted: async payload => {
    console.log(payload.researchType);
  },

  ArmyArrived: async payload => {
    console.log(payload.armyId);
  },

  ArmyReturned: async payload => {
    console.log(payload.armyId);
  },

  RuinSpawned: async payload => {
    console.log(payload.ruinId);
  },

  RuinExpired: async payload => {
    console.log(payload.ruinId);
  },
};
Виконання події

Тут є нюанс із union type.

Я зазвичай роблю switch.

async function executeEvent(
  event: ScheduledEvent,
): Promise<void> {
  switch (event.type) {
    case ScheduledEventType.BuildingCompleted:
      return handlers.BuildingCompleted(event.payload);

    case ScheduledEventType.ResearchCompleted:
      return handlers.ResearchCompleted(event.payload);

    case ScheduledEventType.ArmyArrived:
      return handlers.ArmyArrived(event.payload);

    case ScheduledEventType.ArmyReturned:
      return handlers.ArmyReturned(event.payload);

    case ScheduledEventType.RuinSpawned:
      return handlers.RuinSpawned(event.payload);

    case ScheduledEventType.RuinExpired:
      return handlers.RuinExpired(event.payload);
  }
}
Scheduler Service
export class SchedulerService {
  constructor(
    private readonly repository: ScheduledEventRepository,
  ) {}

  async tick(): Promise<void> {
    const events =
      await this.repository.findReadyEvents(
        new Date(),
      );

    for (const event of events) {
      await executeEvent(event);

      await this.repository.delete(event.id);
    }
  }
}
Запуск раз на хвилину

Node.js:

const scheduler = new SchedulerService(
  repository,
);

setInterval(
  () => scheduler.tick(),
  60_000,
);

Я б навіть пішов ще далі і зробив не BuildingCompleted, а більш універсальну модель:

enum ScheduledEventType {
  ConstructionFinished,
  TrainingFinished,
  MovementFinished,
}

Тому що будівлі, дослідження і тренування військ — це по суті одна й та сама механіка:

початок
↓
час очікування
↓
завершення

Тоді кількість типів подій сильно зменшується, а код стає простішим підтримувати. Для браузерної стратегії це зазвичай вигідніше, ніж заводити десятки окремих типів подій.