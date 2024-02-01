import React from "react";

import Dropdown from "../Dropdown/Dropdown";
import QuantityInput from "../QuantityInput/QuantityInput";
import styles from "./ProductLine.module.css";

function ProductLine() {
  const [products, setProducts] = React.useState([]);
  const [quantity, setQuantity] = React.useState(0);
  const [cargoData, setCargoData] = React.useState({});

  const id = React.useId();

  const foundProduct = React.useMemo(() => {
    const cargo = cargoData.chosenCargo;
    return products.find((product) => product.name === cargo);
  }, [products, cargoData]);

  React.useEffect(() => {
    if (foundProduct) {
      setCargoData(() => ({
        id: foundProduct.id,
        chosenCargo: foundProduct.name,
        quantity,
        totalCargoSize: foundProduct.size * quantity || 0,
      }));
    }
  }, [quantity, foundProduct]);

  React.useEffect(() => {
    fetch("https://rf-candidate-sat-backend.azurewebsites.net/api/Products")
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.slice(0, -1);
        setProducts(filteredData);
      });
  }, []);

  const handleCargoChange = React.useCallback((event) => {
    setCargoData((prevCargoData) => ({
      ...prevCargoData,
      chosenCargo: event.target.value,
    }));
  }, []);

  return (
    <div className={styles.content}>
      <Dropdown
        key={`${id}-${cargoData.chosenCargo}`}
        value={cargoData.chosenCargo || ""}
        onChange={handleCargoChange}
      >
        <option value="" disabled hidden>
          Product
        </option>
        {products.map((product, index) => (
          <option key={index}>{product.name}</option>
        ))}
      </Dropdown>
      <QuantityInput quantity={quantity} setQuantity={setQuantity} />
      {cargoData.totalCargoSize || 0}
    </div>
  );
}

export default ProductLine;
