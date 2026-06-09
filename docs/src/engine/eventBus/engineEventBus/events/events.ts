import { type Ruin } from "@engine/sharedBridge";

export type engineEvents = {
  // RUIN
  "ruin:spawned": Ruin["id"];
  "ruin:destroyed": { ruinId: Ruin["id"]; ruinLocation: Ruin["location"] };
  "ruin:expired": Ruin["id"];
  "ruin:removed": { ruinId: Ruin["id"]; ruinLocation: Ruin["location"] };
  "ruin:discovered": Ruin["id"];
};
