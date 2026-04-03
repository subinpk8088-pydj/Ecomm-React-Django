import { useState } from "react";

function Login() {
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
      localStorage.setItem("token", data.access); // 🔥 IMPORTANT
      alert("Login successful");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />

      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}

export default Login;