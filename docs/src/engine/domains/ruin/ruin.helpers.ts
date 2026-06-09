import {
  MAX_COMMON_RUIN_LEVEL,
  MIN_COMMON_RUIN_LEVEL,
  type Ruin,
} from "@engine/sharedBridge";
import { generateId, randomInt } from "@utils/helpers";
import { generateUnit } from "../unit/unit.helpers";
import { ruinConfig } from "./ruin.config";

/**
 * Генерує сутність руїни із заданим рівнем і випадковою кількістю обсідіана.
 *
 * @param level - рівень руїни(напр. 1)
 *
 * @see randomInt
 * @see generateUnit
 * @see generateId
 *
 * @returns Новий об'єкт руїни із заданим рівнем
 *
 * @example
 * Створеня руїни 1 лвл
 * const ruin = generateRuin(1);
 * console.log(ruin.obsidian); // 24
 */
export function generateRuin(level: Ruin["level"]): Ruin {
  const config = ruinConfig[level];

  const obsidian = randomInt(config.obsidian.min, config.obsidian.max);

  const squad: Ruin["squad"] = {};

  for (const unit of Object.keys(
    config.squad
  ) as (keyof typeof config.squad)[]) {
    const data = config.squad[unit];
    const quantity = randomInt(data.countMin, data.countMax);

    const generated = generateUnit(unit, "monsters", data.level, quantity);
    if (generated) {
      squad[unit] = generated;
    }
  }

  const ruin: Ruin = {
    id: generateId(`ruin_${level}`),
    type: "ruin",
    visible: false,
    place: "world",
    level,
    race: "monsters",
    lifeTime: config.lifeTime,
    obsidian,
    squad,
    resources: config.resources,
  };

  return ruin;
}

/**
 * Генерує сутність руїни із випадковим рівнем і випадковою кількістю обсідіана.
 *
 * @see randomInt
 * @see generateUnit
 * @see generateId
 *
 * @returns Новий об'єкт руїни з випадковим рівнем
 *
 * @example
 * Створеня руїни з випадковим рівнем
 * const ruin = generateRuin();
 * console.log(ruin.level); // 5
 */
export function generateRandomLevelRuin(): Ruin {
  const randomLevel = randomInt(
    MIN_COMMON_RUIN_LEVEL,
    MAX_COMMON_RUIN_LEVEL
  ) as Ruin["level"];
  const config = ruinConfig[randomLevel];

  const obsidian = randomInt(config.obsidian.min, config.obsidian.max);

  const squad: Ruin["squad"] = {};

  for (const unit of Object.keys(
    config.squad
  ) as (keyof typeof config.squad)[]) {
    const data = config.squad[unit];
    const quantity = randomInt(data.countMin, data.countMax);

    const generated = generateUnit(unit, "monsters", data.level, quantity);
    if (generated) {
      squad[unit] = generated;
    }
  }

  const ruin: Ruin = {
    id: generateId(`ruin_${randomLevel}`),
    type: "ruin",
    visible: false,
    place: "world",
    level: randomLevel,
    race: "monsters",
    lifeTime: config.lifeTime,
    obsidian,
    squad,
    resources: config.resources,
  };

  return ruin;
}
