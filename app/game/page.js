"use client";

import { useState } from "react";

export default function GamePage() {
  const [gameNumber, setGameNumber] = useState("");
  const [quarter, setQuarter] = useState("");
  const [teamName, setTeamName] = useState("");
  const [players, setPlayers] = useState("");
  const [scoreInput, setScoreInput] = useState("");
  const [totalScore, setTotalScore] = useState(0);

  const handleScoreSubmit = () => {
    if (!scoreInput) return;

    const value = parseInt(scoreInput);
    if (isNaN(value)) {
      alert("숫자를 입력하세요 (예: 1, -1)");
      return;
    }

    setTotalScore(prev => prev + value);
    setScoreInput("");
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>🏀 경기 기록 입력</h1>

      <div style={{ marginTop: 20 }}>
        <label>경기 번호: </label>
        <input
          value={gameNumber}
          onChange={e => setGameNumber(e.target.value)}
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <label>쿼터: </label>
        <input
          value={quarter}
          onChange={e => setQuarter(e.target.value)}
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <label>팀 이름: </label>
        <input
          value={teamName}
          onChange={e => setTeamName(e.target.value)}
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <label>팀원 (콤마로 구분): </label>
        <input
          value={players}
          onChange={e => setPlayers(e.target.value)}
          placeholder="홍길동, 김철수, 이영희"
        />
      </div>

      <hr style={{ margin: "30px 0" }} />

      <h2>현재 점수: {totalScore}</h2>

      <div style={{ marginTop: 20 }}>
        <input
          value={scoreInput}
          onChange={e => setScoreInput(e.target.value)}
          placeholder="점수 입력 (예: 1, -1)"
        />
        <button onClick={handleScoreSubmit} style={{ marginLeft: 10 }}>
          점수 반영
        </button>
      </div>

      <div style={{ marginTop: 40 }}>
        <h3>📋 현재 경기 정보</h3>
        <p>Game: {gameNumber}</p>
        <p>Quarter: {quarter}</p>
        <p>Team: {teamName}</p>
        <p>Players: {players}</p>
      </div>
    </div>
  );
}
