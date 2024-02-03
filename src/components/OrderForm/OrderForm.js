import React from "react";
import ProductLine from "../ProductLine/ProductLine";
// import OrderCapacityTotal from "../OrderCapacityTotal/OrderCapacityTotal";

import styles from "./OrderForm.module.css";

function OrderForm() {
  const [productLines, setProductLines] = React.useState([<ProductLine />]);
  const [totalCapacity, setTotalCapacity] = React.useState([]);

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
              <div className={styles.productLine} key={index}>
                <ProductLine
                  totalCapacity={totalCapacity}
                  setTotalCapacity={setTotalCapacity}
                  productLines={productLines}
                />
              </div>
            );
          })}
        </div>
        <p> Total capacity needed: {totalCapacity} </p>
      </div>

      <button onClick={addProductLine} className={styles.button}>
        Add a new product line
      </button>
      <button className={styles.button}>BOOK VEHICLE!</button>
    </>
  );
}

export default OrderForm;
