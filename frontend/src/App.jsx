import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import Register from "./pages/register";
import Login from "./pages/Login";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <div>
      <div className="inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" >
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes/:id"
          element={
            <ProtectedRoute>
              <NoteDetailPage />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      </div>
    </div>
  );
}

export default App;
