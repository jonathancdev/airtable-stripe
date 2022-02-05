import React, { useState, useEffect } from "react";
import "./App.css";
import { getProducts } from "./api/airtable";
import {
  getRecords,
  getLimitedRecords,
  getSpecificRecord,
  updateRecord,
  decrementInventory,
} from "./airbase/calls";
import { handleFormSubmission } from "./api/stripe";
function App() {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const products = getProducts.then((a) => {
      setProducts(a);
      setLoading(false);
    });
    //setProducts(products);
  }, []);
  const testId = "recK64VE92W9Liy1J";
  const serverTest = () => {
    console.log("sup");
  };
  const handleBuyClick = (obj) => {
    console.log(obj);
    handleFormSubmission(obj);
  };
  console.log(products);
  return (
    <div className="App">
      {process.env.REACT_APP_ENVIRONMENT}
      <div>
        <button onClick={() => decrementInventory(testId)}>
          decrement inventory
        </button>
        <button onClick={serverTest}>checkout</button>
      </div>
      <div>products</div>
      {loading && <p>loading...</p>}
      {!loading &&
        products &&
        products.map((product) => {
          return (
            <div>
              <img src={product.fields.images[0].thumbnails.large.url} />
              <h1>{product.fields.name}</h1>
              <div>
                <h2>${product.fields.price}</h2>

                <button
                  onClick={() =>
                    handleBuyClick({
                      id: product.fields.idCalculation,
                      quantity: 1,
                    })
                  }
                >
                  buy me
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default App;
