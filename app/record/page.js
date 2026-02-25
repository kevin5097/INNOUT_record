"use client"

import { useEffect, useState } from "react"
import { db } from "../../../lib/firebase"
import { collection, getDocs } from "firebase/firestore"

export default function RecordPage() {
  const [games, setGames] = useState([])

  useEffect(() => {
    const fetchGames = async () => {
      const querySnapshot = await getDocs(collection(db, "games"))
      const list = []
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() })
      })
      setGames(list)
    }

    fetchGames()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h2>경기 기록</h2>

      {games.map((game) => (
        <div key={game.id} style={{ marginBottom: 20 }}>
          <div>{new Date(game.date.seconds * 1000).toLocaleDateString()}</div>
          <div>
            {game.teamA} {game.totalA} : {game.totalB} {game.teamB}
          </div>
        </div>
      ))}
    </div>
  )
}
