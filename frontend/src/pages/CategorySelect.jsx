import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CategorySelect() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { gameType } = useParams(); // Homeから渡ってくるゲームタイプ

  useEffect(() => {
    fetch("http://localhost:3001/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  // カテゴリ選択時に gameType に応じて遷移
  const handleCategoryClick = (categoryId) => {
    switch (gameType) {
      case "flash":
        navigate(`/flash/${categoryId}`);
        break;
      case "tf":
        navigate(`/tf/${categoryId}`);
        break;
      case "chronology":
        navigate(`/chronology/${categoryId}`);
        break;
      case "map":
        navigate(`/map/${categoryId}`);
        break;
      default:
        console.warn("Unknown game type:", gameType);
        navigate(`/flash/${categoryId}`); // デフォルトは一問一答
    }
  };

  return (
    <div
      style={{
        padding: 30,
        fontFamily: "sans-serif",
        background: "#b0e0e6",
        minHeight: "100vh",
      }}
    >
      {/* ホームへ戻るボタン */}
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

      {/* カテゴリリスト */}
      <div style={{ padding: 30 }}>
        <h2>カテゴリを選択</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {categories.map((cat) => (
            <li key={cat.id} style={{ marginTop: 10 }}>
              <button
                onClick={() => handleCategoryClick(cat.id)}
                style={{
                  padding: "10px 16px",
                  borderRadius: 8,
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                {cat.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
