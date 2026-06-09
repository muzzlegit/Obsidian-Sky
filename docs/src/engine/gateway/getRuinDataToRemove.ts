import { type Kingdom, type Ruin } from "@bridge/gameCore";
import { engineEventBus } from "@engine/eventBus/engineEventBus/engineEventBus";

export const getRuinDataToRemove = ({
  ruinId,
  ruinLocation,
}: {
  ruinId: Ruin["id"];
  ruinLocation: Ruin["location"];
}): {
  ruinId: Ruin["id"];
  kingdomId: Kingdom["id"];
  fieldId: string;
} | null => {
  if (!ruinLocation?.kingdomIndex || !ruinLocation?.fieldIndex) return null;
  const kingdom = engineEventBus.query(
    "kingdom:getKingdom",
    ruinLocation.kingdomIndex
  );
  if (!kingdom) return null;
  return {
    ruinId,
    kingdomId: kingdom.id,
    fieldId: kingdom.fields[ruinLocation.fieldIndex].id,
  };
};
