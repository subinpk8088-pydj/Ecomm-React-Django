import { useEffect, useState } from "react";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5656/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleBuy = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first!");
      return;
    }

    const res = await fetch("http://127.0.0.1:5656/api/orders/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ product_id: productId }),
    });

    const data = await res.json();
    alert(data.message || "Error");
  };

  return (
    <div>
      <h2>Products</h2>

      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <button onClick={() => handleBuy(product.id)}>Buy Now</button>
        </div>
      ))}
    </div>
  );
}

export default Home;