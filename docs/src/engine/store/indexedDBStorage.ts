import { createStore, get, set } from "idb-keyval";

const db = createStore("OBSIDIAN_SKY", "GAME_STORE");

export const indexedDBStorage = {
  getItem: async (key: string) => {
    return await get(key, db);
  },
  setItem: async (key: string, value: any) => {
    await set(key, value, db);
  },
  removeItem: async (key: string) => {
    await set(key, undefined, db);
  },
};
