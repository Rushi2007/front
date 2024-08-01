import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import ManageProcedure from "../../ProviderLandingPage/ProviderLandingPageArea/ManageProcedure"
import Select from 'react-select';

function AddAccomodationDetailsArea() {
    const [name, setUsername] = useState("");
    const [pId, setPId] = useState("");
    const [rates, setRates] = useState('');
    const [accommodationType, setAccommodationType] = useState('');
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUsername = localStorage.getItem("name");
        if (storedUsername) {
            setUsername(storedUsername);
            console.log("provider name", storedUsername);
        }

        const storedPId = localStorage.getItem("provider_id");
        if (storedPId) {
            setPId(storedPId);
            console.log("provider id insurance page", storedPId);
        }
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/accommodation/${storedPId}`);
                const result = response.data.data; // Assuming data is an array
                console.log("accommodation", result);
                setData(result);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };
    
        fetchData();
    }, []);

  
    // import Swal from 'sweetalert2';

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post('http://localhost:8081/accommodation', {
            rates: rates,
            providerId: pId,
            accommodationType: accommodationType,
          });
    
          // Assuming the server returns an object containing the newly inserted record in "insertedRecords" property
          const insertedRecord = response.data.insertedRecords;
    
          // Update data state with the new record received from the server
          setData([...data, insertedRecord]);
    
          // Reset form fields
          setRates('');
          setAccommodationType('');
    
          // Display a success Swal notification to the user
          Swal.fire({
            title: 'Success!',
            text: 'Accommodation added successfully',
            icon: 'success',
            confirmButtonColor: '#8fb569',
            confirmButtonText: 'OK',
          });
        } catch (error) {
          // Display an error Swal notification to the user if an error occurs
          Swal.fire({
            title: 'Error!',
            text: 'Error adding accommodation',
            icon: 'error',
            confirmButtonColor: '#8fb569',
            confirmButtonText: 'OK',
          });
        }
      };
    

    const handleDelete = async (index) => {
        const accommodation_id = data[index].accommodation_id; // Assuming the property name is "Idaccommodation"
        try {
            const response = await axios.delete(`http://localhost:8081/accommodation/${accommodation_id}`);
            console.log(response.data);
            Swal.fire({
                title: 'Success!',
                text: 'Record deleted.',
                icon: 'success',
                confirmButtonColor: '#8fb569',
                confirmButtonText: 'OK',
            });
            const updatedData = data.filter((record) => record.accommodation_id !== accommodation_id);
            setData(updatedData);
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error!',
                text: 'Error deleting accommodation.',
                icon: 'error',
                confirmButtonColor: '#8fb569',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <div>
            <div className="col py-3">
                <section className="login-area pt-50 pb-80">
                    <div className="container-fluid">
                        <div className="row flex-nowrap">
                            <div
                                className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 "
                                style={{ backgroundColor: "#223645" }}
                            >
                                <br></br>
                                <ManageProcedure />
                            </div>
                            <div className="col-lg-9  justify-content-center">
                                <div className="basic-login">
                                    <h2 className="text-center mb-60">Add Insurance Details</h2>
                                    <form className="service-contact-form" action="">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label>
                                                    <h5 className="theme-color">Add Accommodation:</h5>
                                                </label>
                                                <div className="duration-input-group">
                                                    <input
                                                        type="text"
                                                        placeholder=""
                                                        value={accommodationType}
                                                        onChange={(e) => setAccommodationType(e.target.value)}
                                                        required
                                                        style={{ height: "72px" }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="checkout-form-list duration-wrapper">
                                                    <label>
                                                        <h5 className="theme-color">Charges Details:</h5>
                                                    </label>
                                                    <div className="duration-input-group">
                                                        <input
                                                            type="text"
                                                            placeholder=""
                                                            value={rates}
                                                            onChange={(e) => setRates(e.target.value)}
                                                            required
                                                            style={{ height: "72px" }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3" style={{ marginTop: "13px" }}>
                                                <button
                                                    type="submit"
                                                    className="primary_btn btn-icon-green w-50"
                                                    onClick={handleSubmit}
                                                    style={{ marginTop: "15px" }}
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-lg-10 mt-4">
                                        {isLoading ? (
                                            <p>Loading...</p>
                                        ) : (
                                                <table className="table table-striped table-hover select_style">
                                                <thead>
                                                    <tr>
                                                        <th>Accommodation Type</th>
                                                        <th>Charhges Details</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.map((record, index) => (
                                                        <tr key={record.accommodation_id}>
                                                            <td>{record.accommodation_type}</td>
                                                            <td>{record.rate}</td>
                                                            <td>
                                                                <div className="d-flex flex-column flex-sm-row">
                                                                    <button
                                                                        className="primary_btn btn-icon-green btn-sm"
                                                                        onClick={() => handleDelete(index)}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            )}
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default AddAccomodationDetailsArea;
