// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CategorySelect from "./pages/CategorySelect";
import Flash from "./pages/Flashcard";
import TF from "./pages/TFGame";
import Chronology from "./pages/Chronology";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<CategorySelect />} />
        <Route path="/select-category/:gameType" element={<CategorySelect />} />
        <Route path="/flash/:categoryId" element={<Flash />} />
        <Route path="/tf/:categoryId" element={<TF />} />
        <Route path="/chronology/:categoryId" element={<Chronology />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
