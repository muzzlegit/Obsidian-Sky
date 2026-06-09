import { engineEventBus } from "@engine/eventBus/engineEventBus/engineEventBus";
import { type Domain, type Kingdom, type Ruin } from "@engine/sharedBridge";
import type { KingdomUI, RuinUI } from "gameCore/types";

export const getKingdomById = (kingdomId: Kingdom["id"]): KingdomUI | null => {
  const kingdom = engineEventBus.query("kingdom:getKingdomById", kingdomId);
  if (!kingdom) return null;
  const { fields } = kingdom;
  const formattedFields = fields.map((field) => {
    const { world, underworld } = field.domains;
    const worldDomain = world
      ? engineEventBus.query("server:getDomain", {
          domainId: world.id,
          domainType: world.type,
        })
      : null;

    return { ...field, domains: { world: ruinDTO(worldDomain), underworld } };
  }) as KingdomUI["fields"];
  return {
    id: kingdom.id,
    fields: formattedFields,
  };
};

export function getDomainDTO(domainModel: Domain) {
  switch (domainModel.type) {
    case "ruin":
      return ruinDTO(domainModel);
    default:
      return null;
  }
}

export function ruinDTO(model: Ruin | null): RuinUI | null {
  if (!model) return null;
  return {
    id: model.id,
    level: model.level,
    type: model.type,
    ...(model?.isHero && { isHero: model.isHero }),
  };
}
