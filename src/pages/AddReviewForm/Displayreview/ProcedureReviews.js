import React, { useEffect, useState } from 'react';
import styles from './ProcedureReviews.module.css';
import avatar from './pricing-thumb-1.png';
const ProcedureReviews = ({ procedureId }) => {
  const [reviews, setReviews] = useState([]);
  console.log("=====>p",procedureId);
  useEffect(() => {
    // Fetch reviews by procedure ID
    console.log("1===><",procedureId);
    const fetchReviews = async () => {
      try {
        fetch(`http://localhost:8081/reviews/procedure/id?procedureId=${procedureId}`)
  .then(response => response.json())
  .then(data => setReviews(data))
  .catch(error => console.error(error));
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [procedureId]);
console.log("r==>",reviews);
  return (
    <div className={styles.container}>
    {reviews.length === 0 ? (
      <p>No reviews found for this procedure.</p>
    ) : (
      <ul className={styles['review-list']}>
        {reviews.map((review) => (
          <li className={styles['review-item']} key={review.id}>
            <img src={avatar} alt="Avatar" />
            <div className={styles['patient-info']}>
              <h4 className={styles['patient-name']}>{review.patient_name}</h4>
              <p className={styles.rating}>Rating: {review.rating}</p>
              <p className={styles.comment}>{review.comment}</p>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
  
  
  );
};

export default ProcedureReviews;
