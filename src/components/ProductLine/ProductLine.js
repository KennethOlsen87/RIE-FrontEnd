import React from "react";

import Dropdown from "../Dropdown/Dropdown";
import QuantityInput from "../QuantityInput/QuantityInput";
import styles from "./ProductLine.module.css";

function ProductLine() {
  const [products, setProducts] = React.useState([]); // Initialize products as an empty array
  const [chosenProduct, setChosenProduct] = React.useState("");
  const [quantity, setQuantity] = React.useState(0);
  const [totalSize, setTotalSize] = React.useState(0);

  React.useEffect(() => {
    fetch("https://rf-candidate-sat-backend.azurewebsites.net/api/Products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  React.useEffect(() => {
    const foundProduct = products.find(
      (product) => product.name === chosenProduct
    );
    if (foundProduct) {
      setTotalSize(foundProduct.size * quantity);
    }
  }, [quantity, chosenProduct, products]);

  //   console.log("totalSize: ", totalSize); // 0
  //   console.log("Product: ", chosenProduct); // string
  //   console.log("quantity: ", quantity); // number
  //   console.log("products: ", products); // [ {...},{...}]

  const handleProductChange = React.useCallback((event) => {
    setChosenProduct(event.target.value);
  }, []);

  return (
    <div className={styles.content}>
      <Dropdown value={chosenProduct} onChange={handleProductChange}>
        <option value="" disabled hidden>
          Product
        </option>
        {products.map((product, index) => (
          <option key={index}>{product.name}</option>
        ))}
      </Dropdown>
      <QuantityInput quantity={quantity} setQuantity={setQuantity} />
      {totalSize}
    </div>
  );
}

export default ProductLine;
