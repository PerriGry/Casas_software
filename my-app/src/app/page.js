"use client";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/casas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ v_nombre: name }),
      });
      const data = await res.json();

      if (!res.ok || !data || data.error) {
        throw new Error(data?.error || "Error buscando");
      }
      setResult(data.result ?? null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-2xl">
        <input
          type="text"
          placeholder="Escribe un nombre..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border rounded-md px-3 py-2"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-yellow-600 text-white hover:bg-yellow-800 transition"
        >
          Buscar
        </button>
      </form>

      {/* ÚNICO bloque de visualización */}
      <div className="mt-6 border rounded-lg p-4 w-full max-w-2xl min-h-16">
        {!submitted && <p className="text-gray-400">Escribe un nombre y dale buscar…</p>}
        {submitted && loading && <p>Buscando…</p>}
        {submitted && !loading && error && <p className="text-red-600">{error}</p>}
        {submitted && !loading && !error && result && (
          <div>
            <h3 className="font-bold">{result.nombre}</h3>
            {result.descripcion && <p>{result.descripcion}</p>}
            <div className="text-sm opacity-80 space-y-1 text-yellow-800">
              {result.correo && <div> {result.correo}</div>}
              {result.telefono && <div> {result.telefono}</div>}
              {result.url && (
                <a href={result.url} target="_blank" rel="noreferrer" className="underline">
                  {result.url}
                </a>
              )}
            </div>
            {result.imagen && (
              <img src={`data:image/jpeg;base64,${result.imagen}`} alt={result.nombre} className="mt-2 max-h-40 object-contain" />
            )}
          </div>
        )}
        {submitted && !loading && !error && !result && (
          <p className="text-gray-400">Sin resultados.</p>
        )}
      </div>
    </div>
  );
}
