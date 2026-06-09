import type { Kingdom } from "@engine/sharedBridge";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type KingdomUI = {
  id: Kingdom["id"];
  x: number;
  y: number;
};

export type RootStateUI = {
  kingdomsId: KingdomUI[];
  currentKingdom: KingdomUI | null;
};

export const useStoreUI = create<RootStateUI>()(
  devtools(
    immer((__, _) => ({
      kingdomsId: [],
      currentKingdom: null,
    })),
    { name: "GAME_UI" }
  )
);

// Синхронне API

export const select = <T>(selector: (state: RootStateUI) => T): T =>
  selector(useStoreUI.getState());

export const mutate = (fn: (state: RootStateUI) => void): void =>
  useStoreUI.setState((state) => {
    fn(state);
  });
