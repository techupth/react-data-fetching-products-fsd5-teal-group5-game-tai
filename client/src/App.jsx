import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [Post, setPost] = useState([]);

  const getPost = async () => {
    const result = await axios.get("http://localhost:4001/products");

    setPost(result.data.data);
  };

  const cutPost = async (id) => {
    await axios.delete(`http://localhost:4001/products/${id}`);
    getPost();
  };
  ///products/:id
  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {Post.map((p, index) => {
          return (
            <div className="product" key={index}>
              <div className="product-preview">
                <img
                  src={p.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {p.name}</h1>
                <h2>Product price: {p.price} Baht</h2>
                <p>Product description: {p.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => {
                  cutPost(p.id);
                }}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
