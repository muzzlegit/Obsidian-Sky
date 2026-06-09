import type { RESOURCES } from "../constants";

export type Resource = (typeof RESOURCES)[number];

export type Resources = Record<Resource, number>;

export type Obsidian = number;
