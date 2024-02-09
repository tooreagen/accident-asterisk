import { Container, GlobalStyle } from "./components/GlobalStyle";
import AccidentListPage from "./pages/AccidentListPage";

function App() {
  return (
    <>
      <Container>
        <AccidentListPage />
      </Container>
      <GlobalStyle />
    </>
  );
}

export default App;
