import React from "react";

import Dropdown from "../Dropdown/Dropdown";
import QuantityInput from "../QuantityInput/QuantityInput";
import styles from "./ProductLine.module.css";

function ProductLine() {
  const [products, setProducts] = React.useState([]);
  const [chosenProduct, setChosenProduct] = React.useState("");
  const [quantity, setQuantity] = React.useState(0);
  const [totalCargoSize, setTotalCargoSize] = React.useState(0);

  React.useEffect(() => {
    fetch("https://rf-candidate-sat-backend.azurewebsites.net/api/Products")
      .then((response) => response.json())
      .then((data) => setProducts(data.slice(0, -1)));
    // Used data.slice to remove last element i products array (which is a faulty string element)
  }, []);

  const foundProduct = React.useMemo(() => {
    return products.find((product) => product.name === chosenProduct);
  }, [products, chosenProduct]);

  React.useEffect(() => {
    if (foundProduct) {
      setTotalCargoSize(foundProduct.size * quantity);
    }
  }, [quantity, foundProduct]);

  //   console.log("quantity: ", quantity); // number
  //   console.log("totalSize: ", totalSize); // 0
  //   console.log("Product: ", chosenProduct); // string
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
      {totalCargoSize}
    </div>
  );
}

export default ProductLine;
