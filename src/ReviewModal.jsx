/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Modal.css";

export function ReviewModal(props) {
  const [reviewText, setReviewText] = useState("");

  const handleReviewChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleAddReview = () => {
    // Call the onAddReview prop with the review text
    props.onAddReview(reviewText);
    props.onClose();
  };

  if (props.show) {
    return (
      <div className="modal-background">
        <section className="modal-main">
          <p>Would you like to leave a review for {props.bar.name} ?</p>
          <textarea placeholder="Enter your review..." value={reviewText} onChange={handleReviewChange} />
          <button type="button" onClick={handleAddReview}>
            Add Review
          </button>
          <button className="close" type="button" onClick={props.onClose}>
            &#x2715;
          </button>
        </section>
      </div>
    );
  }
}
