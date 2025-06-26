import { useEffect, useRef, useState } from "react";
import { Mic, Square, Monitor, Waves, Download, Eraser } from "lucide-react";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!SpeechRecognition) {
      alert("Tu navegador no soporta SpeechRecognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "es-AR";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        finalTranscript += event.results[i][0].transcript;
      }
      setTranscript(finalTranscript);
    };

    recognition.onerror = (event) => {
      console.error("Error de reconocimiento:", event.error);
    };

    recognitionRef.current = recognition;
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript]);

  useEffect(() => {
    const handleKeydown = (e) => {
      const key = e.key.toLowerCase();
      if (key === "g" && !isRecording) {
        handleStart();
      } else if (key === "d" && isRecording) {
        handleStop();
      } else if (key === "f") {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      } else if (key === "l") {
        setTranscript("");
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [isRecording]);

  const handleStart = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleStop = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);

      // Guardar en localStorage
      if (transcript.trim()) {
        const now = new Date();
        const timestamp = now.toLocaleString("es-AR");
        const id = Date.now();

        const newItem = {
          id,
          timestamp,
          content: transcript.trim(),
        };

        const previous = JSON.parse(localStorage.getItem("transcriptions")) || [];
        localStorage.setItem("transcriptions", JSON.stringify([...previous, newItem]));
      }
    }
  };

  const handleDownload = () => {
    const now = new Date();
    const timestamp = now.toLocaleString("es-AR");
    const filename = now.toDateString().split(" ").join("-");

    const contenido = `Transcripción descargada el ${timestamp}\n\n${transcript}`;

    const file = new Blob([contenido], { type: "text/plain" });
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = `transcripcion-${filename}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-100 px-6 py-12 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl p-8 space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-gray-800 flex items-center justify-center gap-2">
            <Waves className="w-8 h-8 text-orange-500" />
            Transcripción en Vivo
          </h1>
          {isRecording && (
            <p className="text-red-600 font-medium animate-pulse">🔴 Escuchando...</p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            Accesos rápidos: <strong>G</strong> para grabar, <strong>D</strong> para detener, <strong>L</strong> para limpiar, <strong>F</strong> para pantalla completa
          </p>
        </header>

        <div className="overflow-x-auto">
          <div className="flex gap-4 flex-nowrap justify-center min-w-full pb-2">
            <button
              onClick={handleStart}
              disabled={isRecording}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full disabled:opacity-50 whitespace-nowrap"
            >
              <Mic className="w-5 h-5" /> Iniciar (G)
            </button>
            <button
              onClick={handleStop}
              disabled={!isRecording}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full disabled:opacity-50 whitespace-nowrap"
            >
              <Square className="w-5 h-5" /> Detener (D)
            </button>
            <button
              onClick={() => setTranscript("")}
              className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-full whitespace-nowrap"
            >
              <Eraser className="w-5 h-5" /> Limpiar texto (L)
            </button>
            <button
              onClick={() => document.documentElement.requestFullscreen()}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full whitespace-nowrap"
            >
              <Monitor className="w-5 h-5" /> Pantalla completa (F)
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="h-80 overflow-y-auto border border-gray-300 rounded-xl p-6 bg-gray-50 shadow-inner"
          aria-live="polite"
        >
          <p
            className={`text-gray-700 whitespace-pre-wrap leading-relaxed transition-all duration-300 ${isRecording ? "text-2xl md:text-3xl font-medium" : "text-base"
              }`}
          >
            {transcript || "🗣️ El texto transcripto aparecerá aquí..."}
          </p>
        </div>

        <div>
          {!isRecording && transcript && (
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-black hover:bg-gray-700 text-white px-6 py-3 rounded-full whitespace-nowrap m-auto"
            >
              <Download className="w-5 h-5" /> Descargar TXT
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export { Home };
