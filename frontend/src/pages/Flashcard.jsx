import { useEffect, useState } from "react";

export default function Flashcard() {
  const [card, setCard] = useState(null);

  const fetchCard = async () => {
    const res = await fetch("/api/flashcard"); // バックエンドURL
    const data = await res.json();
    setCard(data);
  };

  useEffect(() => {
    fetchCard();
  }, []);

  if (!card) return <div>読み込み中...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{card.question}</h2>
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => alert(card.answer)}
      >
        答えを見る
      </button>
      <button
        className="mt-2 ml-2 px-4 py-2 bg-green-500 text-white rounded"
        onClick={fetchCard}
      >
        次の問題
      </button>
    </div>
  );
}
