import { KingdomView } from "@client/components/domains/kingdom/pages/KingdomView/KingdomView";
import { startGameUI } from "@client/shared/helpers";
import { select } from "@client/store/store";
import { TestEnvironment } from "@utils/testEnvironment/TestEnvironment";

export const RootLayout = () => {
  startGameUI();
  const currentKingdom = select((state) => state.currentKingdom);
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TestEnvironment>
        <KingdomView kingdom={currentKingdom} />
      </TestEnvironment>
    </div>
  );
};
