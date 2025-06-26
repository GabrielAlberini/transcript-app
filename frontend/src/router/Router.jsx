import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout"
import { Home } from "@/pages/Home";
import { History } from "@/pages/History";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/historial" element={<History />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
