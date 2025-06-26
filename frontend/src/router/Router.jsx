import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout"
import { Home } from "@/pages/Home";
import { History } from "@/pages/History";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Instructions } from "../pages/Instructions";
import { ProtectedRoute } from "../components/PrivateRoute"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/historial"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/instrucciones" element={<Instructions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
