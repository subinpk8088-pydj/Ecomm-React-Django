import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("is_admin");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("is_admin");

    alert("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "15px",
        background: "#222",
        color: "white",
      }}
    >
      <Link style={linkStyle} to="/">Home</Link>

      {token && <Link style={linkStyle} to="/orders">Orders</Link>}

      {/* 🔥 ONLY ADMIN CAN SEE */}
      {isAdmin === "true" && (
        <Link style={linkStyle} to="/dashboard">Dashboard</Link>
      )}

      {!token && <Link style={linkStyle} to="/login">Login</Link>}

      {token && (
        <button onClick={handleLogout} style={buttonStyle}>
          Logout
        </button>
      )}
    </nav>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
};

const buttonStyle = {
  background: "red",
  color: "white",
  border: "none",
  padding: "5px 10px",
  cursor: "pointer",
};

export default Navbar;