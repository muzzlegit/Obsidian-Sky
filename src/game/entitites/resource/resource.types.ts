import type { RESOURCES } from "./resource.constants";

export type Resource = (typeof RESOURCES)[number];

export type Resources = Record<Resource, number>;
