import { gameAPI } from "@bridge/gameAPI";
import type { Kingdom } from "gameCore/types";
import { RuinMarker } from "../../atom/RuinMarker/RuinMarker";
import { KingdomFieldView } from "../../organisms/KingdomFieldView/KingdomFieldView";

type KingdomViewProps = {
  id: Kingdom["id"];
  x: number;
  y: number;
};

export const KingdomView = ({
  kingdom,
}: {
  kingdom: KingdomViewProps | null;
}) => {
  if (!kingdom) return null;

  const currentKingdom = gameAPI.getKingdomById(kingdom.id);
  if (!currentKingdom) return null;
  const { fields } = currentKingdom;
  return (
    <div>
      <div>
        {kingdom.x} - {kingdom.y}
      </div>

      <div
        style={{
          width: "990px",
          height: "525px",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {fields.map((field, index) => {
          const isRuin = field?.domains?.world?.type === "ruin";
          return (
            <KingdomFieldView
              key={field.id}
              fieldIndex={index}
              domain={
                isRuin ? <RuinMarker ruin={field.domains.world} /> : undefined
              }
            />
          );
        })}
      </div>
    </div>
  );
};
