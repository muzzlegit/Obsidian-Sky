import { type Domain } from "@engine/sharedBridge";

// ---- QUERIES ----

import { engineEventBus } from "@engine/eventBus/engineEventBus/engineEventBus";

export function getDomainById({
  domainId,
  domainType,
}: {
  domainId: Domain["id"];
  domainType: Domain["type"];
}): Domain | null {
  switch (domainType) {
    case "ruin":
      return engineEventBus.query("ruin:getRuinById", domainId);

    default:
      return null;
  }
}
