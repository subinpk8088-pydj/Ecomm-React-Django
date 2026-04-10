import { useEffect, useState } from "react";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5656/api/users/")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>👥 Users</h1>

      {users.map((user) => (
        <div key={user.id}>
          <p>{user.username} - {user.phone_number}</p>
        </div>
      ))}
    </div>
  );
}

export default AdminUsers;