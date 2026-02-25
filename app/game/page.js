"use client";

import { useState } from "react";

export default function GamePage() {
  // 기본 경기 정보
  const [date, setDate] = useState("");
  const [gameNumber, setGameNumber] = useState("");

  // 팀 정보
  const [teamAName, setTeamAName] = useState("");
  const [teamAPlayers, setTeamAPlayers] = useState("");

  const [teamBName, setTeamBName] = useState("");
  const [teamBPlayers, setTeamBPlayers] = useState("");

  // 쿼터 입력
  const [quarter, setQuarter] = useState("");
  const [finalAScore, setFinalAScore] = useState("");
  const [finalBScore, setFinalBScore] = useState("");

  const [quarters, setQuarters] = useState([]);

  // 쿼터 저장
  const saveQuarterResult = () => {
    if (!quarter || finalAScore === "" || finalBScore === "") {
      alert("쿼터와 점수를 모두 입력하세요.");
      return;
    }

    setQuarters((prev) => [
      ...prev,
      {
        quarter: Number(quarter),
        finalScore: {
          A: Number(finalAScore),
          B: Number(finalBScore),
        },
      },
    ]);

    setQuarter("");
    setFinalAScore("");
    setFinalBScore("");
  };

  // 경기 전체 저장
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
    };

    console.log("저장될 데이터:", gameData);
    alert("경기 데이터가 콘솔에 저장되었습니다.");
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>🏀 경기 기록</h1>

      {/* 경기 기본 정보 */}
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

      {/* 팀 정보 */}
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

      {/* 쿼터 입력 */}
      <h2 style={{ marginTop: 40 }}>📊 쿼터 최종 점수 입력</h2>

      <div>
        <label>쿼터: </label>
        <input
          value={quarter}
          onChange={(e) => setQuarter(e.target.value)}
          placeholder="예: 1"
        />
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
        style={{ marginTop: 15, padding: "5px 10px" }}
      >
        쿼터 저장
      </button>

      {/* 저장된 쿼터 목록 */}
      <h3 style={{ marginTop: 30 }}>📋 저장된 쿼터</h3>

      {quarters.map((q, index) => (
        <div key={index}>
          Q{q.quarter} : {teamAName || "A"} {q.finalScore.A} -{" "}
          {teamBName || "B"} {q.finalScore.B}
        </div>
      ))}

      {/* 현재 경기 요약 */}
      <h2 style={{ marginTop: 40 }}>📌 경기 요약</h2>

      <p>날짜: {date}</p>
      <p>Game: {gameNumber}</p>
      <p>
        A 팀: {teamAName} ({teamAPlayers})
      </p>
      <p>
        B 팀: {teamBName} ({teamBPlayers})
      </p>

      {/* 경기 전체 저장 버튼 */}
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
