import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Flashcard() {
  const [card, setCard] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false); //
  const navigate = useNavigate();

  const fetchCard = async () => {
    try {
    const res = await fetch("http://localhost:3001/api/flashcard/random"); // バックエンドURL
    const data = await res.json();
    setCard(data);
    setShowAnswer(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCard();
  }, []);

  if (!card) return <div style={{ textAlign: "center", marginTop: 50 }}>読み込み中...</div>;

  return (
     <div
      style={{
        padding: 30,
        fontFamily: "sans-serif",
        background: "#b0e0e6",
        minHeight: "100vh",
      }}
    >

      {/* ホームボタン */}
      <button
        onClick={() => navigate("/")}
        style={{
          position: "fixed",
          top: 20,
          left: 20,
          padding: "10px 16px",
          fontSize: 14,
          borderRadius: 8,
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          cursor: "pointer",
          border: "none",
        }}
      >
        ← ホームへ
      </button>
      
      {/* タイトル */}
      <h2 style={{ textAlign: "center" }}>一問一答</h2>

      {/* カード */}
      <div
        style={{
          background: "#fff",
          padding: 25,
          borderRadius: 16,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          maxWidth: 600,
          margin: "30px auto",
        }}
      >
        {/* 問題文 */}
        <p style={{ fontSize: 20, lineHeight: 1.6 }}>{card.question}</p>

        {/* 答えボタン */}
        <div style={{ marginTop: 20 }}>
          <button
            style={{
              padding: "12px 20px",
              fontSize: 16,
              borderRadius: 8,
              cursor: "pointer",
              marginRight: 10,
            }}
            onClick={() => setShowAnswer(true)}
          >
            答えを見る
          </button>
          
          {showAnswer && (
          <div
            style={{
              marginTop: 20,
              background: "#f8f8fa",
              padding: 15,
              borderRadius: 10,
              borderLeft: "4px solid #888",
            }}
          >
            <h3>答え</h3>
            <p style={{ lineHeight: 1.6 }}>{card.answer}</p>
          </div>
        )}

        {/* 次の問題へ */}
          <button
            onClick={fetchCard}
            style={{
              padding: "12px 20px",
              fontSize: 16,
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            次の問題
          </button>
        </div>
      </div>
    </div>
  );
}
