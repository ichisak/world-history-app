import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Flashcard() {
  const { categoryId } = useParams();
  const [card, setCard] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const navigate = useNavigate();

  const fetchCard = async () => {
    try {
      const url = categoryId
        ? `http://localhost:3001/api/flashcard/random?category_id=${categoryId}`
        : "http://localhost:3001/api/flashcard/random";

      const res = await fetch(url);
      const data = await res.json();
      setCard(data);
      setShowAnswer(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCard();
  }, [categoryId]);

  if (!card) return <div style={{ textAlign: "center", marginTop: 50 }}>読み込み中...</div>;

  return (
    <div style={{ padding: 30, fontFamily: "sans-serif" }}>
      <button onClick={() => navigate("/category")} style={{ marginBottom: 20 }}>
        ← カテゴリ選択へ戻る
      </button>

      <div
        style={{
          background: "#b0e0e6",
          padding: 25,
          borderRadius: 16,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          maxWidth: 600,
          margin: "0 auto",
        }}
      >
        <p style={{ fontSize: 20 }}>{card.question}</p>

        <div style={{ marginTop: 20 }}>
          <button
            onClick={() => setShowAnswer(true)}
            style={{ padding: "12px 20px", borderRadius: 8, marginRight: 10 }}
          >
            答えを見る
          </button>
          <button
            onClick={fetchCard}
            style={{ padding: "12px 20px", borderRadius: 8 }}
          >
            次の問題
          </button>
        </div>

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
            <p>{card.answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}
