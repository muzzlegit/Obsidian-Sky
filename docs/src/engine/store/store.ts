import type { Kingdom, Ruin, TimedDomain } from "@engine/sharedBridge";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type RootState = {
  // players: Player[];
  kingdoms: Kingdom[];
  ruins: Ruin[];
  timedDomains: TimedDomain[];
};

const useStore = create<RootState>()(
  devtools(
    immer((__, _) => ({
      // players: [],
      kingdoms: [],
      ruins: [],
      timedDomains: [],
    })),
    { name: "GAME_DB" }
  )
);

// Синхронне API

export const select = <T>(selector: (state: RootState) => T): T =>
  selector(useStore.getState());

export const mutate = (fn: (state: RootState) => void): void =>
  useStore.setState((state) => {
    fn(state);
  });
export function overwriteState(newState: RootState) {
  useStore.setState(newState as RootState, true);
}
