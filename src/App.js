import { Container, GlobalStyle } from "./components/GlobalStyle";
import AccidentList from "./components/AccidentList/AccidentList";

function App() {
  return (
    <>
      <Container>
        <AccidentList />
      </Container>
      <GlobalStyle />
    </>
  );
}

export default App;
