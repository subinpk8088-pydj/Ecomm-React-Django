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
  // 🔐 ADMIN PROTECTION
  const isAdmin = localStorage.getItem("is_admin");
  const token = localStorage.getItem("token");

  if (isAdmin !== "true") {
    return (
      <div style={{ padding: "20px" }}>
        <h2>❌ Access Denied (Admin only)</h2>
      </div>
    );
  }

  const [data, setData] = useState(null);
  const [latest, setLatest] = useState([]);

  // 📊 Fetch dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5656/api/orders/dashboard/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Dashboard error:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, [token]);

  // 🔥 Fetch live orders
  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5656/api/orders/latest/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await res.json();
        setLatest(result);
      } catch (err) {
        console.error("Live error:", err);
      }
    };

    fetchLatest();
    const interval = setInterval(fetchLatest, 3000);

    return () => clearInterval(interval);
  }, [token]);

  if (!data) return <p>Loading...</p>;

  // 🎨 Card style
  const cardStyle = {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    flex: 1,
  };

  return (
    <div style={{ padding: "30px", background: "#f5f6fa", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: "20px" }}>📊 Admin Dashboard</h1>

      {/* 🔢 CARDS */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div style={cardStyle}>
          <h4>👥 Users</h4>
          <h2>{data.total_users}</h2>
        </div>

        <div style={cardStyle}>
          <h4>📦 Orders</h4>
          <h2>{data.total_orders}</h2>
        </div>

        <div style={cardStyle}>
          <h4>💰 Revenue</h4>
          <h2>₹{data.total_revenue || 0}</h2>
        </div>
      </div>

      {/* 📊 CHART */}
      <div style={cardStyle}>
        <h3>Orders per Product</h3>
        <BarChart width={700} height={300} data={data.product_data}>
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