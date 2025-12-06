import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TFGame from "./pages/TFGame";
import Flashcard from "./pages/Flashcard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tf" element={<TFGame />} />
        <Route path="/flash" element={<Flashcard />} />
      </Routes>
    </Router>
  );
}

export default App;
