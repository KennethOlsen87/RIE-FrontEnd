import React from "react";
import ProductLine from "../ProductLine/ProductLine";

import styles from "./OrderForm.module.css";

function OrderForm() {
  const [productLines, setProductLines] = React.useState([<ProductLine />]);

  function addProductLine() {
    const nextProductLines = [...productLines];
    nextProductLines.push(<ProductLine />);
    setProductLines(nextProductLines);
  }

  return (
    <>
      <div className={styles.card}>
        <div className={styles.wrapper}>
          <h5>Product</h5>
          <h5>Quantity</h5>
          <h5>Total size</h5>
        </div>

        <div className={styles.productLines}>
          {productLines.map((productLine, index) => {
            return (
              <div key={index} className={styles.productLine}>
                {productLine}
              </div>
            );
          })}
        </div>
        <p>Total capacity needed </p>
      </div>

      <button onClick={addProductLine} className={styles.button}>
        Add a new product line
      </button>
      <button className={styles.button}>BOOK VEHICLE!</button>
    </>
  );
}

export default OrderForm;
