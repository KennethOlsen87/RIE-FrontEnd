import React from "react";

import styles from "./QuantityInput.module.css";

function QuantityInput({ quantity, setQuantity }) {
  const id = React.useId();

  return (
    <div>
      <input
        className={styles.input}
        id={`${id}-${quantity}`}
        min="0"
        type="number"
        value={quantity}
        onChange={(event) => {
          setQuantity(parseInt(event.target.value));
        }}
      />
    </div>
  );
}

export default React.memo(QuantityInput);
