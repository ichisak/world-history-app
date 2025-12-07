import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function ChronologyGame() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [showYear, setShowYear] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const parseYear = (yearStr) => {
    if (yearStr.startsWith("BC")) {
      return -1 * parseInt(yearStr.replace("BC", ""));
    }
    return parseInt(yearStr);
  };

  const compareEvents = (a, b) => {
    const yearA = parseYear(a.year);
    const yearB = parseYear(b.year);
    if (yearA !== yearB) return yearA - yearB;

    const monthA = a.month ? parseInt(a.month) : 0;
    const monthB = b.month ? parseInt(b.month) : 0;
    return monthA - monthB;
  };

  // 問題を取得する関数（「次の問題へ」でも呼ぶ）
  const fetchQuestion = () => {
    fetch(`http://localhost:3001/api/chronology/${categoryId}`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setShowYear(false);
        setIsCorrect(null);
      });
  };

  useEffect(() => {
    fetchQuestion();
  }, [categoryId]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = [...events];
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    setEvents(items);
  };

  //　判定
  const handleCheck = () => {
    const correctOrder = [...events].sort(compareEvents);
    const isSame = events.every(
      (item, idx) => item.event_id === correctOrder[idx].event_id
    );
    setIsCorrect(isSame);
    setShowYear(true);
    setShowAnswer(true);
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
      {/* ホームへ */}
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
          zIndex: 1000,
        }}
      >
        ← ホームへ
      </button>

      <h2 style={{ textAlign: "center" }}>並び替え</h2>

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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {events.map((event, index) => (
                  <Draggable
                    key={event.event_id}
                    draggableId={String(event.event_id)}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          background: "#f8f8fa",
                          padding: 15,
                          marginBottom: 12,
                          borderRadius: 10,
                          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                          fontSize: 16,
                          lineHeight: 1.5,
                          ...provided.draggableProps.style,
                        }}
                      >
                        {/* 出来事本文 */}
                        <strong>{event.text}</strong>
                        {/* 判定後のみ表示する */}
                        {showYear && (
                          <div
                            style={{
                              marginTop: 6,
                              fontSize: 13,
                              color: "#666",
                            }}
                          >
                            {event.year}
                            {event.month && ` / ${event.month}月`}
                          </div>
                        )}
                        {/* ★ 判定後のみ：解説文を表示 */}
                        {showAnswer && event.explanation && (
                          <div
                            style={{
                              marginTop: 10,
                              background: "#eef0f4",
                              padding: 10,
                              borderRadius: 8,
                              fontSize: 14,
                              color: "#333",
                              borderLeft: "4px solid #888",
                            }}
                          >
                            {event.explanation}
                        </div>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {/* 確定ボタン */}
        <button
          onClick={handleCheck}
          style={{
            marginTop: 20,
            padding: "10px 20px",
            fontSize: 16,
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          確定
        </button>

        {/* 判定 */}
        {isCorrect === true && (
          <p style={{ marginTop: 20, fontSize: 24, textAlign: "center" }}>
            ⭕ 正解！
          </p>
        )}
        {isCorrect === false && (
          <p style={{ marginTop: 20, fontSize: 24, textAlign: "center" }}>
            ❌ 不正解…
          </p>
        )}

        {/* 次の問題へ */}
        {isCorrect !== null && (
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
        )}
      </div>
    </div>
  );
}
