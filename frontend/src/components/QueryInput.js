import { useState } from "react";

export default function QueryInput({ onQuery }) {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    onQuery(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="e.g. Show trade routes with conflict 1500–1700"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Ask</button>
    </form>
  );
}