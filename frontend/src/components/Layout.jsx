import { Outlet, Link, useNavigate } from "react-router-dom";
import { Mic } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="flex flex-col min-h-screen bg-orange-50">
      <header className="bg-white shadow-md">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" onClick={closeMenu}>
            <div className="flex items-center gap-2 text-orange-600 font-bold text-2xl">
              <Mic className="w-6 h-6" />
              <span>Transcripto</span>
            </div>
          </Link>

          {/* Botón hamburguesa para móvil */}
          <button
            className="md:hidden text-orange-600 text-3xl focus:outline-none"
            onClick={toggleMenu}
          >
            ☰
          </button>

          {/* Menú */}
          <ul
            className={`absolute top-[72px] left-0 w-full bg-white shadow-md px-6 py-4 flex flex-col gap-4 text-gray-700 font-medium md:static md:w-auto md:flex-row md:gap-6 md:bg-transparent md:shadow-none md:p-0 ${isOpen ? "block" : "hidden md:flex"
              }`}
          >
            {!user && (
              <li>
                <Link
                  to="/instrucciones"
                  onClick={closeMenu}
                  className="hover:text-orange-600 transition-colors"
                >
                  Instrucciones
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/"
                onClick={closeMenu}
                className="hover:text-orange-600 transition-colors"
              >
                Inicio
              </Link>
            </li>
            {user && (
              <>
                <li>
                  <Link
                    to="/historial"
                    onClick={closeMenu}
                    className="hover:text-orange-600 transition-colors"
                  >
                    Historial
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="cursor-pointer hover:text-orange-600"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
            {!user && (
              <>
                <li>
                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="hover:text-orange-600 transition-colors"
                  >
                    Registrate
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="hover:text-orange-600 transition-colors"
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
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
