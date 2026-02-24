"use client"

import Link from "next/link"

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>🏀 농구 기록 앱</h1>

      <div style={{ marginTop: 20 }}>
        <Link href="/game">
          <button style={{ padding: 20, fontSize: 18 }}>
            새 경기 시작
          </button>
        </Link>
      </div>

      <div style={{ marginTop: 20 }}>
        <Link href="/record">
          <button style={{ padding: 20, fontSize: 18 }}>
            경기 기록 보기
          </button>
        </Link>
      </div>
    </div>
  )
}
