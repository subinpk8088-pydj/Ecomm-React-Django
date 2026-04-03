import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [products, setProducts] = useState([]);

  // 🔄 Fetch products
  useEffect(() => {
    fetch("http://127.0.0.1:5656/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  // 🛒 Buy function
  const handleBuy = (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first!");
      return;
    }

    alert("Proceeding to purchase product ID: " + productId);
  };

  return (
    <div>
      <h1>E-commerce</h1>

      {/* 🔐 AUTH SECTION */}
      <Register />
      <hr />
      <Login />

      <hr />

      {/* 🛍️ PRODUCTS */}
      <h2>Products</h2>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>₹{product.price}</p>

            {product.image && (
              <img
                src={`http://127.0.0.1:5656${product.image}`}
                alt={product.title}
                width="200"
              />
            )}

            {/* 🔥 BUY BUTTON */}
            <button onClick={() => handleBuy(product.id)}>
              Buy Now
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;