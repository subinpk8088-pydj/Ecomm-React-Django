import { useEffect, useState } from "react";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    fetch("http://127.0.0.1:5656/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    await fetch(`http://127.0.0.1:5656/api/products/delete/${id}/`, {
      method: "DELETE",
    });

    fetchProducts();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📦 Products</h1>

      {products.map((p) => (
        <div key={p.id}>
          <p>{p.title} - ₹{p.price}</p>
          <button onClick={() => deleteProduct(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default AdminProducts;