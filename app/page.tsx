"use client";
import { useEffect, useState } from "react";

const API = "http://localhost:8000";

export default function Home() {
  const [word, setWord] = useState("");
  const [guess, setGuess] = useState("");
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    fetch(`${API}/new`)
      .then(res => res.json())
      .then(data => setWord(data.word));
  }, []);

  const submit = async () => {
    if (guess.length !== 5) return;

    const res = await fetch(`${API}/guess`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word, guess })
    });

    const data = await res.json();
    setColors(data.result);
    setGuess("");
  };

  return (
    <main className="container">
      <h1>Infinite Wordle</h1>

      <div className="row">
        {guess.padEnd(5).split("").map((c, i) => (
          <div key={i} className={`tile ${colors[i] || ""}`}>
            {c?.toUpperCase()}
          </div>
        ))}
      </div>

      <input
        maxLength={5}
        value={guess}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGuess(e.target.value.toLowerCase())}
      />

      <button onClick={submit}>ENTER</button>
    </main>
  );
}
