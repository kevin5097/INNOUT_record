"use client"

import { useState } from "react"
import { db } from "../../lib/firebase"
import { collection, addDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"

export default function GamePage() {
  const router = useRouter()

  const [teamA, setTeamA] = useState("")
  const [teamB, setTeamB] = useState("")
  const [scoreA, setScoreA] = useState(0)
  const [scoreB, setScoreB] = useState(0)

  const saveGame = async () => {
    await addDoc(collection(db, "games"), {
      date: new Date(),
      teamA,
      teamB,
      totalA: scoreA,
      totalB: scoreB
    })

    alert("저장 완료")
    router.push("/")
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>경기 진행</h2>

      <input
        placeholder="팀 A 이름"
        value={teamA}
        onChange={(e) => setTeamA(e.target.value)}
      />
      <br /><br />
      <input
        placeholder="팀 B 이름"
        value={teamB}
        onChange={(e) => setTeamB(e.target.value)}
      />
      <br /><br />

      <h3>{teamA} : {scoreA}</h3>
      <button onClick={() => setScoreA(scoreA + 1)}>+1</button>
      <button onClick={() => setScoreA(scoreA - 1)}>-1</button>

      <h3 style={{ marginTop: 20 }}>{teamB} : {scoreB}</h3>
      <button onClick={() => setScoreB(scoreB + 1)}>+1</button>
      <button onClick={() => setScoreB(scoreB - 1)}>-1</button>

      <br /><br />
      <button
        onClick={saveGame}
        style={{ padding: 20, background: "red", color: "white" }}
      >
        경기 종료 및 저장
      </button>
    </div>
  )
}
