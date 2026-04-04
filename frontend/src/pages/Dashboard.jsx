import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function Dashboard() {
  const [data, setData] = useState(null);
  const [latest, setLatest] = useState([]);

  // 📊 Dashboard stats (auto refresh)
  useEffect(() => {
    const fetchData = () => {
      fetch("http://127.0.0.1:5656/api/orders/dashboard/")
        .then((res) => res.json())
        .then((data) => setData(data));
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  // 🔥 Live purchases (auto refresh)
  useEffect(() => {
    const fetchLatest = () => {
      fetch("http://127.0.0.1:5656/api/orders/latest/")
        .then((res) => res.json())
        .then((data) => setLatest(data));
    };

    fetchLatest();
    const interval = setInterval(fetchLatest, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!data) return <p>Loading...</p>;

  // 🎨 Card style
  const cardStyle = {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  };

  return (
    <div style={{ padding: "30px", background: "#f5f5f5", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: "20px" }}>📊 Admin Dashboard</h1>

      {/* 🔢 CARDS */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div style={cardStyle}>
          <h3>Total Users</h3>
          <h2>{data.total_users}</h2>
        </div>

        <div style={cardStyle}>
          <h3>Total Orders</h3>
          <h2>{data.total_orders}</h2>
        </div>
      </div>

      {/* 📊 CHART */}
      <div style={cardStyle}>
        <h3>Orders per Product</h3>
        <BarChart width={600} height={300} data={data.product_data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="product__title" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </div>

      {/* 🔥 LIVE PURCHASES */}
      <div style={{ ...cardStyle, marginTop: "30px" }}>
        <h3>🔥 Live Purchases</h3>

        {latest.length === 0 ? (
          <p>No recent activity</p>
        ) : (
          latest.map((item, index) => (
            <p key={index}>
              🧑 <b>{item.user}</b> bought 🛍️ <b>{item.product}</b>
            </p>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;