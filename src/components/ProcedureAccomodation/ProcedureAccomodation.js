import React, { useState, useEffect } from "react";
import axios from "axios";

const ProcedureAccomodation = ({
  procedureId,
  number,
  condition = false,
  fistClassAdd,
  secondClassAdd,
  setSelectedAccomodationPrice
}) => {
  console.log(
    "procedure id to show accomodation option in procedure is:",
    procedureId
  );
  const [selectedAccomodation, setSelectedAccomodation] = useState("");
  const [Accomodations, setAccomodation] = useState([]);
  const [isOptionSelected, setIsOptionSelected] = useState(false); // New state for tracking option selection
  

  useEffect(() => {
    axios
      .get(`http://localhost:8081/procedure/accomodation/${procedureId}`) // Adjust the URL to match your API endpoint
      .then((response) => {
        setAccomodation(response.data.results);
        console.log("Accomodation data:", response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching options:", error);
      });
  }, [procedureId]);
  const handleAccomodationChange = (event) => {
    const selectedAccomodationName = event.target.value;
    const selectedAccomodationData = Accomodations.find(Accomodation => Accomodation.accommodation_type === selectedAccomodationName);
      setSelectedAccomodation(selectedAccomodationName);
  
    if (selectedAccomodationData) {
      const selectedAccomodationPrice = parseFloat(selectedAccomodationData.rate); // Convert the price to a number
      setSelectedAccomodationPrice(selectedAccomodationPrice);
      setIsOptionSelected(true); 
      console.log("setAccomodationPrice", selectedAccomodationPrice); // Log the selectedOptionPrice
    }
  };

   const radioLabelStyle = {
    display: "block",
    marginBottom: "10px",
  };
  const handleClearSelection = () => {
    setSelectedAccomodation("");
    setSelectedAccomodationPrice(0);
    setIsOptionSelected(false);
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
              aria-expanded={condition}
            >
              Procedure Accomodation Options
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
              {Accomodations.map((Accomodation) => (
                <label key={Accomodation.accommodation_id} style={radioLabelStyle}>
                  <input
                    type="radio"
                    name="option"
                    value={Accomodation.accommodation_type}
                    checked={selectedAccomodation === Accomodation.accommodation_type}
                    onChange={handleAccomodationChange}
                  />
                  &nbsp;&nbsp;
                  {Accomodation.accommodation_type}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  Price : {Accomodation.rate}
                </label>
              ))}
            </form>
            {isOptionSelected && (
              <button
                className="btn btn-danger"
                onClick={handleClearSelection}
              >
                Clear Selection
              </button>
            )}
            {/* <p>Selected option: {selectedAccomodation}</p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProcedureAccomodation;

// import React, { useState } from "react";

// const ProcedureAccomodation = ({
//   number,
//   condition = false,
//   fistClassAdd,
//   secondClassAdd,
// }) => {
//   const [selectedOption, setSelectedOption] = useState("");
//   const handleOptionChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   return (
//     <>
//       <div className="card">
//         <div className="card-header" id={`heading${number}`}>
//           <h5 className="mb-0">
//             <a
//               href="#"
//               className={`btn-link ${fistClassAdd && fistClassAdd}`}
//               data-bs-toggle="collapse"
//               data-bs-target={`#collapse${number}`}
//               aria-controls={`collapse${number}`}
//               aria-expanded={condition}
//             >
//               Procedure Accomodation Options
//             </a>
//           </h5>
//         </div>
//         <div
//           id={`collapse${number}`}
//           className={`collapse ${secondClassAdd && secondClassAdd}`}
//           aria-labelledby={`heading${number}`}
//           data-parent="#accordion"
//         >
//           {/* <div className="card-body">
//             <p>
//               1.ABC <br />
//               2.XYZ
//             </p>
//           </div> */}
//           <div className="card-body">
//             <form>
//               <p>
//                 <label>
//                   <input
//                     type="radio"
//                     name="option"
//                     value="ABC"
//                     checked={selectedOption === "ABC"}
//                     onChange={handleOptionChange}
//                   />
//                   &nbsp; ABC
//                 </label>
//                 <br />
//                 <label>
//                   <input
//                     type="radio"
//                     name="option"
//                     value="XYZ"
//                     checked={selectedOption === "XYZ"}
//                     onChange={handleOptionChange}
//                   />
//                   &nbsp; XYZ
//                 </label>
//               </p>
//             </form>
//             {/* <p>Selected option: {selectedOption}</p> */}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProcedureAccomodation;
