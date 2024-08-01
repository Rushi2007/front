import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';
import ManageProcedure from "../../ProviderLandingPage/ProviderLandingPageArea/ManageProcedure"
import Select from 'react-select';
import Multiselect from "multiselect-react-dropdown";

function AddInsuranceDetailsArea() {
    const [Coverage, setCoverage] = useState("");
    const [Insurance, setInsurance] = useState([]);
    const [Policy, setPolicy] = useState("");
    const [records, setRecords] = useState([]);
    const [data, setData] = useState([]);
    const [name, setUsername] = useState("");
    const [pId, setPId] = useState("");
    const [selectedValues, setSelectedValues] = useState([]);
    const optio = [
        { id: 1, value: 'Life Insurance Corporation of India', label: 'Life Insurance Corporation of India' },
        { id: 2, value: 'Max Life Insurance Company', label: 'Max Life Insurance Company' },
        { id: 3, value: 'Bharti Axa Life Insurance', label: 'Bharti Axa Life Insurance' },
        { id: 4, value: 'Kotak Life Insurance', label: 'Kotak Life Insurance' },
        { id: 5, value: 'Reliance Life Insurance', label: 'Reliance Life Insurance' },
        { id: 6, value: 'Exide Life Insurance', label: 'Exide Life Insurance' },
        { id: 7, value: 'Aegon Life Insurance', label: 'Aegon Life Insurance' },
        { id: 8, value: 'PNB MetLife Insurance', label: 'PNB MetLife Insurance' },
        { id: 9, value: 'Tata AIA Life Insurance', label: 'Tata AIA Life Insurance' },
        { id: 10, value: 'HDFC Life Insurance', label: 'HDFC Life Insurance' },
        { id: 11, value: 'SBI Life Insurance', label: 'SBI Life Insurance' },
        { id: 12, value: 'Bajaj Allianz Life Insurance', label: 'Bajaj Allianz Life Insurance' },
        // Add more options...
    ];

    const resetForm = () => {
        setCoverage("");
        setInsurance("");
        setPolicy("");
    };

    const [loading, setLoading] = useState(true); // Add a loading state

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:8081/accommodation/${pId}`);
          const result = await response.json();
          console.log("accommodation", result.data);
          setData(result.data);
          setLoading(false); // Set loading to false after data is fetched
          console.log("new1==>", setData(result.data));
        } catch (error) {
          console.log(error);
          setLoading(false); // Set loading to false if there's an error
        }
      };
      fetchData();
    }, [pId]);



    // Assuming you have an array to store the selected values
    const state = {
        selectedValues: []
    };

    const onChange = (e) => {
        setSelectedValues(Array.isArray(e) ? e.map(x => x.value) : []);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8081/provider-insurance', {
                Insurance: selectedValues,
                Coverage: Coverage,
                pId: pId,
            });
            console.log(response.data);

            // Update the table with the new record
            const newRecords = response.data.insertedRecords;
            setData(prevData => [...prevData, ...newRecords]);

            Swal.fire({
                title: 'Success!',
                text: 'Insurance companies added.',
                icon: 'success',
                confirmButtonColor: '#8fb569',
                confirmButtonText: 'OK',
            });

            resetForm();
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error!',
                text: 'Error adding insurance companies.',
                icon: 'error',
                confirmButtonColor: '#8fb569',
                confirmButtonText: 'OK',
            });
        }
    };


    const handleDelete = async (index) => {
        const insuranceId = data[index].insuranceId;
        try {
            const response = await axios.delete(`http://localhost:8081/provider-insurance/${insuranceId}`);
            console.log(response.data);
            Swal.fire({
                title: 'Success!',
                text: 'Insurance company deleted.',
                icon: 'success',
                confirmButtonColor: '#8fb569',
                confirmButtonText: 'OK',
            });
            const updatedData = data.filter((record) => record.insuranceId !== insuranceId);
            setData(updatedData);
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error!',
                text: 'Error deleting insurance company.',
                icon: 'error',
                confirmButtonColor: '#8fb569',
                confirmButtonText: 'OK',
            });
        }
    }

    const handleEdit = (index) => {
        const selectedRecord = records[index];
        setInsurance(selectedRecord.insurance);
        setPolicy(selectedRecord.policy);
        setCoverage(selectedRecord.coverage);
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
                                                    <h5 className="theme-color">Insurance Company Names:</h5>
                                                </label>
                                                {/* <select
                                                    multiple
                                                    className="form-select select_style form-group"
                                                    showSearch
                                                    // style={{ width: 200 }}
                                                    placeholder="Select a person"
                                                    optionFilterProp="children"
                                                    onChange={onChange}
                                                >
                                                    {optio.map((item) => (
                                                        <option key={item.id} value={item.id}>{item.label}</option>
                                                    ))}
                                                </select> */}
                                                <Select
                                                    isMulti
                                                    isClearable
                                                    options={optio}
                                                    className="dropdown"
                                                    placeholder="Select Option"
                                                    value={optio.filter(obj => selectedValues.includes(obj.value))} // set selected values
                                                    onChange={onChange}

                                                />
                                                {/* <Multiselect
                                                    options={optio}
                                                    displayValue="label"
                                                /> */}



                                            </div>
                                            <div className="col-md-4">
                                                <div className="checkout-form-list duration-wrapper">
                                                    <label>
                                                        <h5 className="theme-color">Coverage Details:</h5>
                                                    </label>
                                                    <div className="duration-input-group">
                                                        <input
                                                            type="text"
                                                            placeholder=""
                                                            value={Coverage}
                                                            onChange={(e) => setCoverage(e.target.value)}
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
                                        {loading ? (
                                            // If loading is true, display a loading message or a placeholder
                                            <div>Loading...</div>
                                        ) : (
                                            <div className="col-lg-10 mt-4">
                                                <table className="table table-striped table-hover select_style">
                                                    <thead>
                                                        <tr>
                                                            <th>Insurance Company</th>
                                                            <th>Coverage</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {data.map((record, index) => (
                                                            <tr key={record.insuranceId}>
                                                                <td>{record.InsuranceCompanyNames}</td>
                                                                <td>{record.CoverageDetails}</td>
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
                                            </div>
                                        )}
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

export default AddInsuranceDetailsArea;
