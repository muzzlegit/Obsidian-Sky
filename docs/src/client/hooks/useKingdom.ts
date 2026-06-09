import { gameAPI } from "@bridge/gameAPI";
import { type Kingdom } from "@bridge/gameCore";
import { useStoreUI } from "@client/store/store";
import { useCallback } from "react";

export const useKingdom = (kingdomId: Kingdom["id"]) => {
  const kingdom = gameAPI.getKingdomById(kingdomId);
  const currentKingdom = useStoreUI((state) => state.currentKingdom);

  const removeRuinFromKingdom = useCallback(() => {}, []);
  return kingdom;
};
