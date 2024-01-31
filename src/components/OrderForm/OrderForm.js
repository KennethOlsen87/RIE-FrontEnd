import React from "react";
import ProductLine from "../ProductLine/ProductLine";

import styles from "./OrderForm.module.css";

function OrderForm() {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.wrapper}>
          <h5>Product</h5>
          <h5>Quantity</h5>
          <h5>Total size</h5>
        </div>
        <ProductLine />
        <ProductLine />
      </div>
      <button className={styles.button}>Add a new product line</button>
      <button className={styles.button}>BOOK VEHICLE!</button>
    </>
  );
}

export default OrderForm;
