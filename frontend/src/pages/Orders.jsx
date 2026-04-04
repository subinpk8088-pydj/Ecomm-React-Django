import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:5656/api/orders/my/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div>
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div key={order.id}>
            <h3>{order.product}</h3>
            <p>₹{order.price}</p>
            <p>{order.created_at}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;