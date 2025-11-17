import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Create from "./pages/Create";
import DetailNote from "./pages/DetailNote";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/note/:id" element={<DetailNote />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      <Route path="*" element={ <div>page not found for this url</div> } />
      </Routes>
    </>
  );
}

export default App;
