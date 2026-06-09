import { gameAPI } from "@bridge/gameAPI";

const cols = 3;
const rows = 3;

export const useGameData = () => {
  const kingdomsId = gameAPI.getKingdomIdList().map((id, index) => ({
    id,
    x: (index % cols) + 1,
    y: Math.floor(index / rows) + 1,
  }));

  return { kingdomsId };
};
