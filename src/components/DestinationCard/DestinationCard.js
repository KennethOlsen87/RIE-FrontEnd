import React from "react";
import styles from "./DestinationCard.module.css";
import DropDown from "../Dropdown/Dropdown";

function DestinationCard() {
  const [planets, setPlanets] = React.useState([]);
  const [chosenplanet, setChosenPlanet] = React.useState("");

  React.useEffect(() => {
    fetch("https://rf-candidate-sat-backend.azurewebsites.net/api/Planets")
      .then((response) => response.json())
      .then((data) => setPlanets(data));
  }, []);

  if (planets.length === 0) {
    return; // or render a loading state
  }

  return (
    <>
      <div className={styles.card}>
        <h5>Destination</h5>
        <DropDown
          className={styles.element}
          value={chosenplanet}
          onChange={(event) => {
            setChosenPlanet(event.target.value);
          }}
          children={planets.name}
        >
          <option value="" disabled hidden>
            Planet
          </option>
          {planets.map((planet, index) => (
            <option key={index}>{planet.name}</option>
          ))}
        </DropDown>
      </div>
      {/* <p>
        <strong>Selected planet: </strong>
        {chosenplanet}
      </p> */}
    </>
  );
}

export default DestinationCard;
