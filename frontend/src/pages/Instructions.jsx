// src/pages/Instrucciones.jsx

import { AlertTriangle, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";

const Instructions = () => {
  return (

    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 px-6 py-12 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white p-10 rounded-2xl shadow-xl space-y-6">
        <div className="flex items-center gap-3 text-orange-600 text-2xl font-bold">
          <AlertTriangle className="w-8 h-8" />
          Atención: Backend no conectado
        </div>

        <p className="text-gray-700 text-lg">
          Para utilizar correctamente la aplicación de transcripción en tiempo real, es necesario que el servidor backend esté funcionando. Este backend gestiona el registro de usuarios, autenticación y almacenamiento de transcripciones.
        </p>

        <p className="text-gray-700 text-base">
          El código fuente del backend se encuentra disponible públicamente en el siguiente repositorio de GitHub:
        </p>

        <a
          href="https://github.com/GabrielAlberini/transcript-app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold underline"
        >
          Ver repositorio en GitHub
          <ExternalLink className="w-4 h-4" />
        </a>

        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-md text-sm text-gray-700">
          <strong>¿Cómo levantar el backend?</strong>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Cloná el repositorio</li>
            <li>Instalá las dependencias con <code>npm install</code></li>
            <li>Configurá el archivo <code>.env</code> con los datos de tu MongoDB</li>
            <li>Iniciá el servidor con <code>npm run dev</code></li>
          </ul>
        </div>

        <div className="pt-4">
          <Link to="/" className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

export { Instructions }