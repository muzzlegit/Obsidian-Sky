import demonsCards from "./images/demonsCards.webp";
import drowsCards from "./images/drowsCards.webp";
import elfsCards from "./images/elfsCards.webp";
import humansCards from "./images/humansCards.webp";
import monstersCards from "./images/monstersCards.webp";
import undeadsCards from "./images/undeadsCards.webp";
import unitsFrames from "./images/unitsFrames.webp";
import unitsIcons from "./images/unitsIcons.webp";
import wizardsCards from "./images/wizardsCards.webp";

import { unitsFramesMap } from "./maps/unitFrames.map";
import { unitsCardsMap } from "./maps/unitsCards.map";
import { unitsIconsMap } from "./maps/unitsIcons.map";

export const unitsGraphics = {
  cards: {
    demons: demonsCards,
    drows: drowsCards,
    elfs: elfsCards,
    humans: humansCards,
    monsters: monstersCards,
    castleMonsters: monstersCards,
    undeads: undeadsCards,
    wizards: wizardsCards,
  },
  frames: unitsFrames,
  icons: unitsIcons,
  maps: {
    unitsCardsMap,
    unitsFramesMap,
    unitsIconsMap,
  },
};
