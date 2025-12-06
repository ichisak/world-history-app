import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: 40, fontFamily: "sans-serif", background: "#87ceeb", minHeight: "100vh" }}>
      <div style={{ width: "100%", height:480, overflow: "hidden", borderRadius: "0 0 12px 12px" }}>
        <img
          src="/marcus-aurelius.jpg"
          alt="Marcus Aurelius Equestrian Statue"
          style={{ width: "100%", height: "auto", objectFit:"cover", objectPosition:"center", display: "block" }}
        />
      </div>

      <h1 style={{ textAlign: "center" }}>ポケット世界史</h1>
      <p style={{ textAlign: "center", color: "#555" }}>問題ジャンルを選択してください</p>

      <div style={{ display: "grid", gap: 20, maxWidth: 500, margin: "40px auto" }}>
        {/* 正誤判定カード */}
        <Link to="/select-category/tf" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={cardStyle}>
            <h2 style={{ margin: 0 }}>正誤判定</h2>
          </div>
        </Link>   

        {/* 並び替えカード */}
        <Link to="/select-category/sort" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={cardStyle}>
            <h2 style={{ margin: 0 }}>並び替え(準備中)</h2>
          </div>
        </Link>   

        {/* 一問一答カード */}
        <Link to="/select-category/flash" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={cardStyle}>
            <h2 style={{ margin: 0 }}>一問一答</h2>
          </div>
        </Link>   

        {/* 地図問題カード */}
        <Link to="/select-category/map" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={cardStyle}>
            <h2 style={{ margin: 0 }}>地図問題(準備中)</h2>
          </div>
        </Link>   
      </div>

      <footer style={{ textAlign: "center", padding: 10, fontSize: 12, opacity: 0.6 }}>
        Image: Sébastien Bertrand, CC BY 2.0  
        <a href="https://commons.wikimedia.org/w/index.php?curid=1800447" target="_blank">License</a>
      </footer>
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  padding: 20,
  borderRadius: 12,
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
};

export default Home;
