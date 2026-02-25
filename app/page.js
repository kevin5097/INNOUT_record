"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default function RecordPage() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const q = query(
        collection(db, "games"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setGames(data);
    };

    fetchGames();
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1>📋 경기 기록 조회</h1>

      {games.map((game) => (
        <div
          key={game.id}
          style={{
            border: "1px solid #ddd",
            padding: 15,
            marginTop: 15,
          }}
        >
          <p>날짜: {game.date}</p>
          <p>Game: {game.gameNumber}</p>
          <p>
            {game.teams.A.name} {game.finalScore.A} -{" "}
            {game.teams.B.name} {game.finalScore.B}
          </p>
        </div>
      ))}
    </div>
  );
}
