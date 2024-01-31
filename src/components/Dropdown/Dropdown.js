import React from "react";

import styles from "./Dropdown.module.css";

function Dropdown({ value, onChange, children }) {
  const id = React.useId();

  return (
    <>
      <select
        id={`${id}-${value}`}
        className={styles.select}
        value={value}
        onChange={onChange}
      >
        {children}
      </select>
    </>
  );
}

export default Dropdown;
