import React from "react";

import "./App.css";
import DestinationCard from "./components/DestinationCard/DestinationCard";
import OrderForm from "./components/OrderForm/OrderForm";

function App() {
  return (
    <div className="wrapper">
      <h1 className="mainHeading">RIE ordering service</h1>
      <DestinationCard />
      <OrderForm />
    </div>
  );
}

export default App;
