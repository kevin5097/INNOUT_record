"use client";

import { useState } from "react";

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
      alert("점수를 모두 입력하세요.");
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

  // 마지막 쿼터 점수 = 현재 최종 점수
  const latestQuarter = quarters.length > 0
    ? quarters[quarters.length - 1]
    : null;

  const saveGame = () => {
    if (!date || !gameNumber || !teamAName || !teamBName) {
      alert("경기 기본 정보를 모두 입력하세요.");
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
      finalScore: latestQuarter
        ? latestQuarter.finalScore
        : { A: 0, B: 0 },
    };

    console.log("저장될 데이터:", gameData);
    alert("경기 데이터가 콘솔에 저장되었습니다.");
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>🏀 경기 기록</h1>

      <h2>📅 경기 정보</h2>

      <div>
        <label>날짜: </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div style={{ marginTop: 10 }}>
        <label>Game 번호: </label>
        <input
          value={gameNumber}
          onChange={(e) => setGameNumber(e.target.value)}
        />
      </div>

      <h2 style={{ marginTop: 30 }}>👥 팀 정보</h2>

      <div>
        <h3>A 팀</h3>
        <input
          placeholder="팀 이름"
          value={teamAName}
          onChange={(e) => setTeamAName(e.target.value)}
        />
        <br />
        <input
          style={{ marginTop: 5 }}
          placeholder="선수들 (콤마로 구분)"
          value={teamAPlayers}
          onChange={(e) => setTeamAPlayers(e.target.value)}
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <h3>B 팀</h3>
        <input
          placeholder="팀 이름"
          value={teamBName}
          onChange={(e) => setTeamBName(e.target.value)}
        />
        <br />
        <input
          style={{ marginTop: 5 }}
          placeholder="선수들 (콤마로 구분)"
          value={teamBPlayers}
          onChange={(e) => setTeamBPlayers(e.target.value)}
        />
      </div>

      <h2 style={{ marginTop: 40 }}>📊 쿼터 최종 점수 입력</h2>

      <div>
        <label>쿼터: </label>
        <select
          value={quarter}
          onChange={(e) => setQuarter(e.target.value)}
        >
          <option value="">쿼터 선택</option>
          <option value="1">1 쿼터</option>
          <option value="2">2 쿼터</option>
          <option value="3">3 쿼터</option>
          <option value="4">4 쿼터</option>
        </select>
      </div>

      <div style={{ marginTop: 10 }}>
        <label>A 팀 점수: </label>
        <input
          value={finalAScore}
          onChange={(e) => setFinalAScore(e.target.value)}
        />
      </div>

      <div style={{ marginTop: 10 }}>
        <label>B 팀 점수: </label>
        <input
          value={finalBScore}
          onChange={(e) => setFinalBScore(e.target.value)}
        />
      </div>

      <button
        onClick={saveQuarterResult}
        style={{ marginTop: 15 }}
      >
        쿼터 저장
      </button>

      <h3 style={{ marginTop: 30 }}>📋 저장된 쿼터</h3>

      {quarters.map((q, index) => (
        <div key={index}>
          Q{q.quarter} : {teamAName || "A"} {q.finalScore.A} -{" "}
          {teamBName || "B"} {q.finalScore.B}
        </div>
      ))}

      <h2 style={{ marginTop: 40 }}>📌 경기 요약</h2>

      <p>날짜: {date}</p>
      <p>Game: {gameNumber}</p>

      {latestQuarter && (
        <h3>
          🔢 현재 최종 점수 : {teamAName || "A"}{" "}
          {latestQuarter.finalScore.A} -{" "}
          {teamBName || "B"} {latestQuarter.finalScore.B}
        </h3>
      )}

      <button
        onClick={saveGame}
        style={{
          marginTop: 30,
          padding: "10px 15px",
          backgroundColor: "black",
          color: "white",
          cursor: "pointer",
        }}
      >
        💾 경기 전체 저장
      </button>
    </div>
  );
}
