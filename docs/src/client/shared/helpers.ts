import { gameAPI } from "@bridge/gameAPI";
import { mutate } from "@client/store/store";
import { WORLD_GRID } from "./constants";

export function getFormattedKingdomsIdList() {
  console.log(
    "store",
    gameAPI.getKingdomIdList().map((id, index) => ({
      id,
      x: (index % WORLD_GRID.col) + 1,
      y: Math.floor(index / WORLD_GRID.row) + 1,
    }))
  );
  return gameAPI.getKingdomIdList().map((id, index) => ({
    id,
    x: (index % WORLD_GRID.col) + 1,
    y: Math.floor(index / WORLD_GRID.row) + 1,
  }));
}

export function startGameUI() {
  const player = {
    capital: {
      id: "dfssdfds",
      name: "Gray Havens",
      x: 1,
      y: 3,
    },
  };

  const kingdomsId = getFormattedKingdomsIdList();
  const kingdom =
    kingdomsId.find(
      (k) => k.x === player.capital.x && k.y === player.capital.y
    ) ?? null;
  mutate((state) => {
    (state.kingdomsId = kingdomsId), (state.currentKingdom = kingdom);
  });
}
