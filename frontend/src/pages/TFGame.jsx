import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function TfQuiz() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState("");



  const fetchQuestion = async () => {
    const res = await fetch("http://localhost:3001/api/tf-questions/random");
    const data = await res.json();
    setQuestion(data);
    setAnswer(null);
    setResult("");
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const handleAnswer = (value) => {
    setAnswer(value);

    if (value === question.correct) {
      setResult("⭕ 正解！");
    } else {
      setResult("❌ 不正解");
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
                border: "none"
            }}
        >
        ← ホームへ
        </button>


      <h2 style={{ textAlign: "center" }}>正誤判定</h2>

      {question ? (
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
          <p style={{ fontSize: 20, lineHeight: 1.6 }}>
            {question.statement}
          </p>

          {/* ボタン */}
          <div style={{ marginTop: 20 }}>
            <button
              onClick={() => handleAnswer(true)}
              style={{
                padding: "12px 20px",
                fontSize: 16,
                marginRight: 10,
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              正しい
            </button>

            <button
              onClick={() => handleAnswer(false)}
              style={{
                padding: "12px 20px",
                fontSize: 16,
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              誤り
            </button>
          </div>

          {/* 判定 */}
          <p style={{ marginTop: 20, fontSize: 24 }}>{result}</p>

          {/* 解説（回答後のみ表示） */}
          {answer !== null && (
            <div
              style={{
                marginTop: 20,
                background: "#f8f8fa",
                padding: 15,
                borderRadius: 10,
                borderLeft: "4px solid #888",
              }}
            >
              <h3>解説</h3>
              <p style={{ lineHeight: 1.6 }}>{question.explanation}</p>
            </div>
          )}

          {/* 次の問題へ */}
          <button
            onClick={fetchQuestion}
            style={{
              marginTop: 25,
              padding: "10px 20px",
              fontSize: 16,
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            次の問題へ
          </button>
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>読み込み中...</p>
      )}
    </div>
  );
}

export default TfQuiz;
