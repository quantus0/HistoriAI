import { useState } from "react";
import QueryInput from "./components/QueryInput";
import Timeline from "./components/Timeline";
import Map from "./components/Map";
import "./index.css";

export default function App() {
  const [results, setResults] = useState([]);
  const [narrative, setNarrative] = useState("");

  const handleQuery = async (query) => {
    const res = await fetch("http://localhost:8080/api/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: query }),
    });
    const data = await res.json();
    setResults(data.searchResults);
    setNarrative(data.narrative);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">HistoriAI</h1>
      <QueryInput onQuery={handleQuery} />
      {narrative && (
        <div className="mb-4 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold">Narrative</h2>
          <p>{narrative}</p>
        </div>
      )}
      <Timeline events={results} />
      <Map events={results} />
    </div>
  );
}