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
      <div className="modal-background container">
        <section className="modal-main">
          <div className="text-center">
            <p>Would you like to leave a review for {props.bar.name} ?</p>
          </div>
          <div className=" d-flex justify-content-center">
            <textarea
              className="input-group-text "
              placeholder="Enter your review..."
              value={reviewText}
              onChange={handleReviewChange}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button
              className="mt-3 btn btn-primary"
              style={{
                margin: "10px",
                backgroundColor: "#4282AA",
                border: "2px solid #000",
                color: "#FFF",
                textDecoration: "none",
              }}
              type="button"
              onClick={handleAddReview}
            >
              Add Review
            </button>
          </div>
          <button className="close" type="button" onClick={props.onClose}>
            &#x2715;
          </button>
        </section>
      </div>
    );
  }
}
