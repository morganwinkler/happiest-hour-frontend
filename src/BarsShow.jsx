/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, useEffect } from "react";
import { ReviewModal } from "./ReviewModal";
import { useParams } from "react-router-dom";

export function BarsShow(props) {
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
  }
  const { bar_id } = useParams();
  const [favorite, setFavorite] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [thisBar, setThisBar] = useState({});

  const handleAddClick = () => {
    const params = { bar_id };
    console.log(params);
    axios
      .post(`http://localhost:3000/favorites.json`, params)
      .then((response) => {
        console.log(response.data);
        setFavorite(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const handleRemoveClick = (id) => {
    console.log(favorite.id);
    id = favorite.id;
    axios
      .delete(`http://localhost:3000/favorites/${id}.json`)
      .then((response) => {
        console.log(response.data);
        setFavorite(null);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleShowModal = () => {
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleAddReview = (reviewText) => {
    const params = {
      bar_id,
      review: reviewText,
    };
    axios
      .post("http://localhost:3000/reviews.json", params)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/favorites.json")
      .then((response) => {
        //find the favorite that matches the current bar ID
        const userFavorite = response.data.find((favorite) => favorite.bar_id === thisBar.id);
        //set the favorite state
        console.log(userFavorite);
        setFavorite(userFavorite);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [thisBar.id]);

  useEffect(() => {
    axios.get(`http://localhost:3000/bars/${bar_id}.json`).then((response) => {
      setThisBar(response.data);
    });
  }, [bar_id]);

  return (
    <div className="card bg-light" style={{ marginBottom: "50px", marginTop: "50px" }}>
      <div className="row justify-content-between" style={{ marginTop: "25px" }}>
        <div className="col-4">
          <h1 style={{ textDecoration: "underline" }}>{thisBar.name}</h1>
        </div>
        <div className="col-4">
          {favorite ? (
            <button
              onClick={handleRemoveClick}
              className="btn btn-primary"
              style={{
                margin: "10px",
                backgroundColor: "#4282AA",
                border: "2px solid #000",
                color: "#FFF",
                textDecoration: "none",
              }}
            >
              Remove Bar From Favorites
            </button>
          ) : (
            <button
              onClick={handleAddClick}
              className="btn btn-primary"
              style={{
                margin: "10px",
                backgroundColor: "#8DA89F",
                border: "2px solid #000",
                color: "black",
                textDecoration: "none",
              }}
            >
              Add Bar To Favorites
            </button>
          )}
        </div>
      </div>
      <img
        src={thisBar.image_url}
        alt=""
        className="card-img-top mb-auto"
        style={{
          paddingLeft: "200px",
          paddingRight: "200px",
          paddingTop: "25px",
          paddingBottom: "25px",
        }}
      />
      <div className="row justify-content-around">
        <div className="card col-3">
          <h3 style={{ textDecoration: "underline" }}>Specials:</h3>
          <div>
            {thisBar.specials && thisBar.specials.length > 0 ? (
              thisBar.specials.map((special) => (
                <div key={special.id}>
                  <p>{special.special}</p>
                </div>
              ))
            ) : (
              <p>There are no active specials for this bar</p>
            )}
          </div>
        </div>
        <div className="card col-3">
          <h3 style={{ textDecoration: "underline" }}>Location:</h3>
          <p>Address: {thisBar.street_address}</p>
          <p>City: {thisBar.city}</p>
          <p>State: {thisBar.state}</p>
          <p>Zip: {thisBar.zip_code}</p>
        </div>
        <div className="card col-3">
          <h3 style={{ textDecoration: "underline" }}>Hours</h3>
          <p> {thisBar.hours}</p>
        </div>
      </div>
      <div className="card" style={{ margin: "25px" }}>
        <div className="row justify-content-between" style={{ marginTop: "25px" }}>
          <div className="col-4">
            <h3 className="text-start" style={{ textDecoration: "underline", paddingLeft: "25px" }}>
              Reviews
            </h3>
          </div>
          <div className="col-4 text-end" style={{ paddingRight: "25px" }}>
            <button
              className=" btn btn-primary"
              onClick={handleShowModal}
              style={{
                margin: "10px",
                backgroundColor: "#4282AA",
                border: "2px solid #000",
                color: "#FFF",
                textDecoration: "none",
              }}
            >
              + Review
            </button>
            <ReviewModal show={isModalVisible} onClose={handleCloseModal} bar={thisBar} onAddReview={handleAddReview} />
          </div>
        </div>
        {thisBar.reviews && thisBar.reviews.length > 0 ? (
          thisBar.reviews.map((review) => (
            <div key={review.id}>
              <figure className="row text-start" style={{ paddingLeft: "25px" }}>
                <blockquote className="blockquote col-8">
                  <p>{review.review}</p>
                  <figcaption className="blockquote-footer">{review.user}</figcaption>
                </blockquote>
                {review.user_id == props.userId ? (
                  // has to be in ()=> form or shit gets weird
                  <button
                    className="col-2 btn btn-primary"
                    style={{
                      margin: "10px",
                      backgroundColor: "#4282AA",
                      border: "2px solid #000",
                      color: "#FFF",
                      textDecoration: "none",
                    }}
                    onClick={() => props.onDeleteReview(review.id)}
                  >
                    Delete Review
                  </button>
                ) : null}
              </figure>
            </div>
          ))
        ) : (
          <p>There are no active reviews for this bar</p>
        )}
      </div>
    </div>
  );
}
