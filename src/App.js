import { GlobalStyle } from "./components/GlobalStyle";
import AccidentListPage from "./pages/AccidentListPage";
import { Routes, Route } from "react-router-dom";
import AccidentAddPage from "./pages/AccidentAddPage";

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<AccidentListPage />} />
          <Route path="/accidentadd" element={<AccidentAddPage />} />
          <Route path="*" element={<AccidentListPage />} />
        </Routes>
      <GlobalStyle />
    </>
  );
}

export default App;
