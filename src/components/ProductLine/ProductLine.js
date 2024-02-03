import React from "react";

import Dropdown from "../Dropdown/Dropdown";
import QuantityInput from "../QuantityInput/QuantityInput";
import styles from "./ProductLine.module.css";

function ProductLine({ totalCapacity, setTotalCapacity, productLines }) {
  const [products, setProducts] = React.useState([]);
  const [quantity, setQuantity] = React.useState(0);
  const [cargoData, setCargoData] = React.useState({});
  const totalCargoSizeRef = React.useRef(0); // useRef to hold the total cargo size persistently
  const [totalCargoSizeState, setTotalCargoSizeState] = React.useState(0); // State to hold and trigger updates for total cargo size

  const id = React.useId();

  const previousTotalCapacity = React.useRef(totalCapacity);

  const foundProduct = React.useMemo(() => {
    const cargo = cargoData.chosenCargo;
    return products.find((product) => product.name === cargo);
  }, [products, cargoData]);

  React.useEffect(() => {
    if (foundProduct) {
      const newTotalCargoSize = foundProduct.size * quantity || 0;
      totalCargoSizeRef.current = newTotalCargoSize; // Update ref
      setTotalCargoSizeState(newTotalCargoSize); // Update state to reflect changes in total cargo size
      setCargoData(() => ({
        id: foundProduct.id,
        chosenCargo: foundProduct.name,
        quantity,
        totalCargoSize: newTotalCargoSize,
      }));
    }
  }, [quantity, foundProduct]);

  // React.useEffect(() => {
  //   if (foundProduct) {
  //     setCargoData((prevCargoData) => ({
  //       ...prevCargoData,
  //       id: foundProduct.id,
  //       chosenCargo: foundProduct.name,
  //       quantity,
  //       totalCargoSize: foundProduct.size * quantity || 0,
  //     }));
  //   }
  // }, [quantity, foundProduct, setCargoData]);

  // React.useEffect(() => {

  //   const cargoSize = foundProduct ? foundProduct.size * quantity : 0;

  //   // console.log("cargoSize", cargoSize); // gir riktig per cargo

  //   const sum = (total.current = +cargoSize);
  //   console.log("total", total.current);

  //   setTotalCapacity(sum);
  // }, [quantity, foundProduct, setTotalCapacity]);

  // React.useEffect(() => {
  //   let previousSize = totalCapacity;
  //   if (foundProduct) {
  //     productLines.forEach(() => {
  //       const cargoSize = foundProduct ? foundProduct.size * quantity : 0;
  //       const sum = cargoSize;
  //       console.log(sum);
  //       setTotalCapacity(sum);
  //     });
  //     console.log("totalCapacity", totalCapacity);
  //   }
  // }, [productLines, setTotalCapacity, quantity, foundProduct]);

  React.useEffect(() => {
    if (foundProduct) {
      // console.log(
      //   "previousTotalCapacity.current: ",
      //   previousTotalCapacity.current
      // ); // object
      // console.log("foundProduct.size: ", foundProduct.size);
      // console.log("quantity: ", quantity);
      // console.log("totalCargoSize", foundProduct.size * quantity); // 0
      productLines.map(() =>
        setTotalCapacity(
          previousTotalCapacity.current
            ? previousTotalCapacity.current + foundProduct.size * quantity
            : foundProduct.size * quantity
        )
      );
    }
  }, [productLines, quantity, setTotalCapacity, foundProduct]);

  React.useEffect(() => {
    fetch("https://rf-candidate-sat-backend.azurewebsites.net/api/Products")
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.slice(0, -1);
        setProducts(filteredData);
      });
  }, []);

  const handleCargoChange = React.useCallback(
    (event) => {
      setCargoData((prevCargoData) => ({
        ...prevCargoData,
        chosenCargo: event.target.value,
      }));
    },
    [setCargoData]
  );

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
