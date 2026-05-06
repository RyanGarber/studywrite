import { AppShell } from "@mantine/core";
import Setup from "./components/Setup.tsx";
import Header from "./components/Header.tsx";

function App() {
  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Main>
        <Setup />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
