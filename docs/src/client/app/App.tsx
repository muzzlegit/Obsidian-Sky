import { RootLayout } from "@client/components/layouts/RootLayout/RootLayout";
import { ThemeProviderComponent } from "./infrastructure/theme/ThemeProvider";

function App() {
  console.log("APP:RUN");
  return (
    <ThemeProviderComponent>
      <RootLayout />
    </ThemeProviderComponent>
  );
}

export default App;
