import { engineEventBus } from "@engine/eventBus/engineEventBus/engineEventBus";
import { getRuinDataToRemove } from "@engine/gateway";
import type { Ruin } from "./gameCore";

export const initEngineToUiAdapter = () => {
  engineEventBus.on("ruin:removed", () => {});

  return {};
};

function removeRuinFromKingdomUI({
  ruinId,
  ruinLocation,
}: {
  ruinId: Ruin["id"];
  ruinLocation: Ruin["location"];
}) {
  const ruinData = getRuinDataToRemove({ ruinId, ruinLocation });
}
