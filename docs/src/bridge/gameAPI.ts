import { getKingdomById, getKingdomsIdList } from "@engine/gateway";
import type { Kingdom } from "gameCore/types";

export const gameAPI = {
  getKingdomById(kingdomId: Kingdom["id"]) {
    return getKingdomById(kingdomId);
  },
  getKingdomIdList() {
    return getKingdomsIdList();
  },
};
