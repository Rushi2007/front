import React, { useEffect, useState } from "react";

const DisplayOptions = ({ procedureId }) => {
    const [Option, setOption] = useState([]);
    console.log("procedureId=====>Option", procedureId);
    const patient_id = localStorage.getItem("patient_id");
    useEffect(() => {
        // Fetch reviews by procedure ID
        console.log("1===>procedureId=====>Option<", procedureId);
        const fetchReviews = async () => {
            try {
                fetch(`http://localhost:8081/procedure/option/${procedureId}`)
                    .then(response => response.json())
                    .then(data => setOption(data))
                    .catch(error => console.error(error));
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [procedureId]);
    console.log("Option==>", Option);


    return (
        <>
            <div className="container">
                {Option.length === 0 ? (
                    <p>No options found for this procedure.</p>
                ) : (
                    <div>
                        {Option.map((doc) => (
                            <div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="product mb-30">
                                        <div className="product__img">
                                            {/* <Link to="/shopDetails"> */}
                                            <img alt="" />
                                            {/* </Link> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <div className="product-list-content pt-10 mb-30">
                                        <div className="product__content mb-20">
                                            <h4>
                                                <span className="pro-cat">
                                                    <a>{doc.option_name}</a>
                                                </span>
                                            </h4>
                                            <h3 className="pro-title">{doc.pname}</h3>
                                            <h4>
                                                <div className="price">
                                                    <span>₹ {doc.price}</span>
                                                </div>
                                            </h4>
                                            <h5 className="pro-title">{doc.provider_name}</h5>
                                        </div>
                                        <p>{doc.description}</p>
                                        {/* <div className="product-action-list">
                        {patient_id !== null && (
                            <li>
                                <button
                                    className="primary_btn btn-icon ml-0"
                                    onClick={onMoreDetails}
                                >
                                    <span>+</span>Book Procedure
                                </button>
                            </li>
                        )}
                        {patient_id === null && (
                            <li>
                                <button
                                    className="primary_btn btn-icon ml-0"
                                    onClick={handleRedirect}
                                >
                                    <span>+</span> Book Procedure
                                </button>
                            </li>
                        )}

                        <button
                            className="action-btn"
                            onClick={onMoreDetails}
                            style={{ backgroundColor: "#e7e7e7", color: "black" }}
                        >
                            <i className="fas fa-expand"></i> More Details
                        </button>
                    </div> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>


    );
}

export default DisplayOptions
