import React, { useState, useEffect } from "react";
import axios from "axios";

const ProcedureOptions = ({
  procedureId,
  number,
  condition = false,
  fistClassAdd,
  secondClassAdd,
  setOptionPrice
}) => {
  console.log("procedure id to show options in procedure is:", procedureId);
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);
  const [isOptionSelected, setIsOptionSelected] = useState(false); // New state for tracking option selection

  
  useEffect(() => {
    axios
      .get(`http://localhost:8081/procedure/option/${procedureId}`)
      .then((response) => {
        setOptions(response.data);
        console.log("procedure options data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching options:", error);
      });
  }, [procedureId]);

  const handleOptionChange = (event) => {
    const selectedOptionName = event.target.value;
    const selectedOptionData = options.find(
      (option) => option.option_name === selectedOptionName
    );

    setSelectedOption(selectedOptionName);

    if (selectedOptionData) {
      const selectedOptionPrice = parseFloat(selectedOptionData.price);
      setOptionPrice(selectedOptionPrice);
      setIsOptionSelected(true); // Set the state to true when an option is selected
      console.log("setOptionPrice", selectedOptionPrice);
    }
  };

  const handleClearSelection = () => {
    setSelectedOption("");
    setOptionPrice(0); // Reset the option price
    setIsOptionSelected(false); // Reset the selection state
  };

  const radioLabelStyle = {
    display: "block",
    marginBottom: "10px",
  };

  return (
    <>
      <div className="card">
        <div className="card-header" id={`heading${number}`}>
          <h5 className="mb-0">
            <a
              href="#"
              className={`btn-link ${fistClassAdd && fistClassAdd}`}
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${number}`}
              aria-controls={`collapse${number}`}
              // aria-expanded={condition}
              aria-expanded={false} 
            >
              Procedure Options
            </a>
          </h5>
        </div>
        <div
          id={`collapse${number}`}
          className={`collapse ${secondClassAdd && secondClassAdd}`}
          aria-labelledby={`heading${number}`}
          data-parent="#accordion"
        >
          <div className="card-body">
            <form>
              {options.map((option) => (
                <label key={option.option_id} style={radioLabelStyle}>
                  <input
                    type="radio"
                    name="option"
                    value={option.option_name}
                    checked={selectedOption === option.option_name}
                    onChange={handleOptionChange}
                  />
                  &nbsp;&nbsp;
                  {option.option_name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  Price: {option.price}
                </label>
              ))}
            </form>
            {isOptionSelected && ( // Render the button only when an option is selected
              <button
                className="btn btn-danger"
                onClick={handleClearSelection}
              >
                Clear Selection
              </button>
            )}
            {/* <p>Selected option: {selectedOption}</p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProcedureOptions;
