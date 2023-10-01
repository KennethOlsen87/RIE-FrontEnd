import { useState, useEffect } from "react";

function DropDown() {
    const [planets, setPlanets] = useState([]);

    useEffect(() => {
        fetch("https://rf-candidate-sat-backend.azurewebsites.net/api/Planets")
            .then((response) => response.json())
            .then((data) => setPlanets(data));
    }, []);
    
    return (
        <div className="DropdownCard">
        <h3>Destination</h3>
        <select>
            <option value="" disabled selected hidden>Planet</option>
            {planets.map((planet, index) => (
                <option key={index} value={planet.name}>
                    
                    {planet.name}
                </option>
            ))}
        </select>
        </div>
    );
}

export default DropDown;




