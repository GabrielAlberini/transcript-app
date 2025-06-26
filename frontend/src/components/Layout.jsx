import { Outlet, Link, useNavigate } from "react-router-dom";
import { Mic } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function Layout() {
  const { user, logout } = useAuth()

  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="flex flex-col min-h-screen bg-orange-50">
      <header className="bg-white shadow-md">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-orange-600 font-bold text-2xl">
            <Mic className="w-6 h-6" />
            <span>Transcripto</span>
          </div>
          <ul className="flex gap-6 text-gray-700 font-medium">
            <li>
              <Link
                to="/"
                className="hover:text-orange-600 transition-colors"
              >
                Inicio
              </Link>
            </li>
            {
              user && <>
                <li>
                  <Link
                    to="/historial"
                    className="hover:text-orange-600 transition-colors"
                  >
                    Historial
                  </Link>
                </li>
                <li>
                  <button className="cursor-pointer hover:text-orange-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            }{
              !user && <>
                <li>
                  <Link
                    to="/register"
                    className="hover:text-orange-600 transition-colors"
                  >
                    Registrate
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="hover:text-orange-600 transition-colors"
                  >
                    Login
                  </Link>
                </li>
              </>
            }
          </ul>
        </nav>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-white py-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Gabriel Alberini. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
