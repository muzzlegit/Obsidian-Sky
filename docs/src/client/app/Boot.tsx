import { startGame } from "@engine/core/server";
import { useEffect, useState, type ReactNode } from "react";

export function Boot({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function init() {
      await startGame();
      setReady(true);
    }
    init();
  }, []);

  if (!ready) {
    return <div>Завантаження світу...</div>;
  }

  return children;
}
