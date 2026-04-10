import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("is_admin");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav style={navStyle}>
      {/* 🔷 LEFT - LOGO */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <h2 style={{ margin: 0 }}>🛍️ MyStore</h2>
        <Link style={linkStyle} to="/">Home</Link>
        {token && <Link style={linkStyle} to="/orders">Orders</Link>}
      </div>

      {/* 🔷 RIGHT - MENU */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        
        {/* 🔥 ADMIN LINKS */}
        {isAdmin === "true" && (
          <>
            <Link style={linkStyle} to="/dashboard">Dashboard</Link>
            <Link style={linkStyle} to="/admin/products">Products</Link>
            <Link style={linkStyle} to="/admin/users">Users</Link>
            <span style={adminBadge}>ADMIN</span>
          </>
        )}

        {/* 🔐 AUTH */}
        {!token ? (
          <Link style={linkStyle} to="/login">Login</Link>
        ) : (
          <button onClick={handleLogout} style={buttonStyle}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

// 🎨 STYLES
const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 30px",
  background: "#1e1e2f",
  color: "white",
  boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "500",
};

const buttonStyle = {
  background: "#ff4d4f",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
};

const adminBadge = {
  background: "#52c41a",
  padding: "4px 8px",
  borderRadius: "6px",
  fontSize: "12px",
  fontWeight: "bold",
};

export default Navbar;