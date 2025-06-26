import { useEffect, useState } from "react";
import { Download, Trash2, FileText } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const History = () => {
  const [history, setHistory] = useState([]);
  const { user, token } = useAuth();

  useEffect(() => {
    if (!user) return;

    fetch("http://localhost:1234/api/transcriptions", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const reversed = [...data.data].reverse();
          setHistory(reversed);
        } else {
          console.error("❌ Error al obtener historial:", data.error);
        }
      })
      .catch(err => console.error("❌ Error de conexión:", err));
  }, [user]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("es-AR");
  };

  const handleDownloadSingle = (item) => {
    const contenido = `Transcripción descargada el ${formatDate(item.createdAt)}\n\n${item.content}`;
    const blob = new Blob([contenido], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `transcripcion-${item._id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadAll = () => {
    const contenido = history
      .map((item, index) => `--- Conversación ${index + 1} ---\nFecha: ${formatDate(item.createdAt)}\n\n${item.content}\n`)
      .join("\n\n==========================\n\n");
    const blob = new Blob([contenido], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `historial-transcripciones.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleClear = async () => {
    if (!user) return;

    if (confirm("¿Seguro que querés borrar todo el historial?")) {
      try {
        const res = await fetch("http://localhost:1234/api/transcriptions", {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setHistory([]);
        } else {
          console.error("❌ Error al borrar historial:", data.error);
        }
      } catch (err) {
        console.error("❌ Error de conexión:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-100 px-6 py-12 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl p-8 space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-gray-800 flex items-center justify-center gap-2">
            <FileText className="w-8 h-8 text-orange-500" />
            Historial de Transcripciones
          </h1>
          <p className="text-sm text-gray-500">
            Total de conversaciones guardadas: <strong>{history.length}</strong>
          </p>
        </header>

        {history.length > 0 ? (
          <div className="space-y-6 max-h-[500px] overflow-y-auto">
            {history.map((item) => (
              <div
                key={item._id}
                className="bg-gray-50 border border-gray-300 rounded-xl p-4 shadow-sm space-y-2"
              >
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    Conversación {formatDate(item.createdAt)}
                  </p>
                  <button
                    onClick={() => handleDownloadSingle(item)}
                    className="flex items-center gap-1 text-sm bg-black hover:bg-gray-800 text-white px-3 py-1 rounded-full"
                  >
                    <Download className="w-4 h-4" />
                    Descargar
                  </button>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-sm">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No hay transcripciones guardadas.</p>
        )}

        {history.length > 0 && (
          <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
            <button
              onClick={handleDownloadAll}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full"
            >
              <Download className="w-5 h-5" />
              Descargar Todo
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full"
            >
              <Trash2 className="w-5 h-5" />
              Borrar Historial
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export { History };