import { useState } from "react";

function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    phone_number: "",
    name: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await fetch("http://127.0.0.1:5656/api/users/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(JSON.stringify(data));
  };

  return (
    <div>
      <h1>Register</h1>

      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="phone_number" placeholder="Phone" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />

      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}

export default Register;