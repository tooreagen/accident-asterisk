import { Container, GlobalStyle } from "./components/GlobalStyle";
import AccidentListPage from "./pages/AccidentListPage";
import { Routes, Route } from "react-router-dom";
import AccidentAddPage from "./pages/AccidentAddPage";

function App() {
  return (
    <>
      <Container>
        <Routes>
          <Route path="/" element={<AccidentListPage />} />
          <Route path="/accidentadd" element={<AccidentAddPage />} />
          <Route path="*" element={<AccidentListPage />} />
        </Routes>
      </Container>
      <GlobalStyle />
    </>
  );
}

export default App;
