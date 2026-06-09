import { indexedDBStorage } from "@engine/store/indexedDBStorage";
import {
  mutate,
  overwriteState,
  select,
  type RootState,
} from "@engine/store/store";
import { generateId } from "@utils/helpers";
import type { Kingdom, KingdomField } from "gameCore/gameResources/src";
import { useState, type ReactNode } from "react";
import {
  ButtonsWrap,
  CloseButton,
  ComponentContainer,
  Container,
  MenuButton,
  PlayerWrap,
  TestButton,
} from "./TestEnvironment.styled";
import { kingdom_map, testPlayer } from "./testConstants";

function generateTestPlayer() {
  return testPlayer;
}

export function generateTestKigdoms(): Kingdom[] {
  const map: KingdomField[] = kingdom_map.map((place, index) => ({
    id: generateId(`field_${index}`),
    terrain: place,
    domains: { world: null, underworld: null },
  }));
  const world: Kingdom[] = [];
  for (let index = 0; index < 9; index++) {
    world.push({
      id: generateId(`kingdom_${index}`),
      ruinsQuantity: 0,
      occupiedFields: [],
      fields: map,
    });
  }
  return world;
}

function setTestPlayerToDB(deleteAll?: boolean): void {
  if (deleteAll) {
    mutate((state) => (state.players = []));
    return;
  }
  mutate((state) => state.players.push(generateTestPlayer()));
}

function setTestKingdomsToDB() {
  mutate((state) => (state.kingdoms = generateTestKigdoms()));
}

async function loadServerFromDB() {
  const server: RootState = await indexedDBStorage.getItem("server");

  if (!server) {
    console.error("Не вдалось завантажити сервер з БД");
    return;
  }
  overwriteState(server);
}

function saveToDB() {
  const server = select((state) => state);
  indexedDBStorage.setItem("server", server);
}

type TestEnvironment = {
  children?: ReactNode;
};

export const TestEnvironment = ({ children }: TestEnvironment) => {
  const [isMenu, setIsMenu] = useState(false);
  const [isComponent, setIsComponent] = useState(false);

  const toggleMenu = () => {
    setIsMenu((prev) => !prev);
  };

  return (
    <>
      {!isMenu ? (
        <MenuButton onClick={toggleMenu}>T</MenuButton>
      ) : (
        <Container>
          <div>
            <PlayerWrap>
              <TestButton
                onClick={() => {
                  setTestPlayerToDB();
                }}
              >
                Додати гравця
              </TestButton>
              <TestButton
                onClick={() => {
                  setTestPlayerToDB(true);
                }}
              >
                Видалити всіх гравців
              </TestButton>
            </PlayerWrap>
            <ButtonsWrap>
              <TestButton onClick={setTestKingdomsToDB}>
                Згенерувати тестову карту
              </TestButton>
              <TestButton onClick={saveToDB}>
                Зберегти поточний сервер в БД
              </TestButton>
              <TestButton onClick={loadServerFromDB}>
                Завантажити сервер з БД
              </TestButton>
            </ButtonsWrap>
          </div>
          <TestButton
            onClick={() => {
              setIsComponent((prev) => !prev);
            }}
          >
            Тест компонентів
          </TestButton>
          <CloseButton onClick={toggleMenu}>Закрити</CloseButton>
        </Container>
      )}
      {isComponent ? <TestComponent>{children}</TestComponent> : null}
    </>
  );
};

export default function TestComponent({ children }: { children: ReactNode }) {
  return <ComponentContainer>{children}</ComponentContainer>;
}
