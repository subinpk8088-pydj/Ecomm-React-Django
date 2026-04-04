import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await fetch("http://127.0.0.1:5656/api/users/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.access) {
      localStorage.setItem("token", data.access);
      localStorage.setItem("is_admin", data.is_admin); // 🔥 STORE ROLE

      alert("Login successful");

      // 🔥 ROLE BASED REDIRECT
      if (data.is_admin) {
        navigate("/dashboard");
      } else {
        navigate("/");
      }

    } else {
      alert("Login failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login</h1>

      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        style={{ display: "block", marginBottom: "10px" }}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        style={{ display: "block", marginBottom: "10px" }}
      />

      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}

export default Login;