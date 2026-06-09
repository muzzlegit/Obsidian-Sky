import { engineEventBus } from "@engine/eventBus/engineEventBus/engineEventBus";
import { type Kingdom } from "@engine/sharedBridge";

export const getKingdomsIdList = (): Kingdom["id"][] => {
  return engineEventBus.query("kingdom:getKingdomsIdList");
};
