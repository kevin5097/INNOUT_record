"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function GamePage() {
  const [date, setDate] = useState("");
  const [gameNumber, setGameNumber] = useState("");

  const [teamAName, setTeamAName] = useState("");
  const [teamAPlayers, setTeamAPlayers] = useState("");

  const [teamBName, setTeamBName] = useState("");
  const [teamBPlayers, setTeamBPlayers] = useState("");

  const [quarter, setQuarter] = useState("");
  const [finalAScore, setFinalAScore] = useState("");
  const [finalBScore, setFinalBScore] = useState("");

  const [quarters, setQuarters] = useState([]);

  const saveQuarterResult = () => {
    if (!["1", "2", "3", "4"].includes(quarter)) {
      alert("1~4 쿼터만 선택 가능합니다.");
      return;
    }

    if (finalAScore === "" || finalBScore === "") {
      alert("점수를 입력하세요.");
      return;
    }

    const newQuarter = {
      quarter: Number(quarter),
      finalScore: {
        A: Number(finalAScore),
        B: Number(finalBScore),
      },
    };

    setQuarters((prev) => [...prev, newQuarter]);

    setQuarter("");
    setFinalAScore("");
    setFinalBScore("");
  };

  const latestQuarter =
    quarters.length > 0
      ? quarters[quarters.length - 1].finalScore
      : { A: 0, B: 0 };

  const saveGame = async () => {
    if (!date || !gameNumber || !teamAName || !teamBName) {
      alert("경기 기본 정보를 입력하세요.");
      return;
    }

    const gameData = {
      date,
      gameNumber: Number(gameNumber),
      teams: {
        A: {
          name: teamAName,
          players: teamAPlayers.split(",").map((p) => p.trim()),
        },
        B: {
          name: teamBName,
          players: teamBPlayers.split(",").map((p) => p.trim()),
        },
      },
      quarters,
      finalScore: latestQuarter,
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(db, "games"), gameData);
      alert("경기 저장 완료 🔥");
      setQuarters([]);
    } catch (error) {
      console.error(error);
      alert("저장 실패");
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>🏀 경기 기록</h1>

      <h2>📅 경기 정보</h2>

      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <br /><br />
      <input
        placeholder="Game 번호"
        value={gameNumber}
        onChange={(e) => setGameNumber(e.target.value)}
      />

      <h2 style={{ marginTop: 30 }}>👥 팀 정보</h2>

      <h3>A 팀</h3>
      <input
        placeholder="팀 이름"
        value={teamAName}
        onChange={(e) => setTeamAName(e.target.value)}
      />
      <br />
      <input
        placeholder="선수들 (콤마 구분)"
        value={teamAPlayers}
        onChange={(e) => setTeamAPlayers(e.target.value)}
      />

      <h3 style={{ marginTop: 20 }}>B 팀</h3>
      <input
        placeholder="팀 이름"
        value={teamBName}
        onChange={(e) => setTeamBName(e.target.value)}
      />
      <br />
      <input
        placeholder="선수들 (콤마 구분)"
        value={teamBPlayers}
        onChange={(e) => setTeamBPlayers(e.target.value)}
      />

      <h2 style={{ marginTop: 40 }}>📊 쿼터 점수 입력</h2>

      <select value={quarter} onChange={(e) => setQuarter(e.target.value)}>
        <option value="">쿼터 선택</option>
        <option value="1">1 쿼터</option>
        <option value="2">2 쿼터</option>
        <option value="3">3 쿼터</option>
        <option value="4">4 쿼터</option>
      </select>

      <br /><br />
      <input
        placeholder="A 팀 점수"
        value={finalAScore}
        onChange={(e) => setFinalAScore(e.target.value)}
      />
      <br />
      <input
        placeholder="B 팀 점수"
        value={finalBScore}
        onChange={(e) => setFinalBScore(e.target.value)}
      />

      <br /><br />
      <button onClick={saveQuarterResult}>쿼터 저장</button>

      <h3 style={{ marginTop: 30 }}>📋 저장된 쿼터</h3>
      {quarters.map((q, i) => (
        <div key={i}>
          Q{q.quarter} : {teamAName || "A"} {q.finalScore.A} -{" "}
          {teamBName || "B"} {q.finalScore.B}
        </div>
      ))}

      <h2 style={{ marginTop: 30 }}>
        🔢 현재 최종 점수 : {teamAName || "A"} {latestQuarter.A} -{" "}
        {teamBName || "B"} {latestQuarter.B}
      </h2>

      <button
        onClick={saveGame}
        style={{ marginTop: 20, padding: "10px 15px" }}
      >
        💾 경기 전체 저장
      </button>
    </div>
  );
}
