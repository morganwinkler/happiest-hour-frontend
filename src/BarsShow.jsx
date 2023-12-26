/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, useEffect } from "react";
import { ReviewModal } from "./ReviewModal";
import { useParams } from "react-router-dom";

export function BarsShow() {
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
    <div>
      <div>
        <h1>{thisBar.name}</h1>
        {favorite ? (
          <button onClick={handleRemoveClick}>Remove Bar From Favorites</button>
        ) : (
          <button onClick={handleAddClick}>Add Bar To Favorites</button>
        )}
      </div>
      <img src={thisBar.image_url} alt="" />
      <div>
        <h3>Specials:</h3>
        <div>
          {thisBar.specials && thisBar.specials.length > 0 ? (
            thisBar.specials.map((special) => (
              <div key={special.id}>
                <p>{special.review}</p>
              </div>
            ))
          ) : (
            <p>There are no active specials for this bar</p>
          )}
        </div>
      </div>
      <div>
        <h3>Location:</h3>
        <p>{thisBar.street_address}</p>
        <p> {thisBar.city}</p>
        <p> {thisBar.state}</p>
        <p> {thisBar.zip_code}</p>
      </div>
      <div>
        <h3>Hours</h3>
        <p> {thisBar.hours}</p>
      </div>
      <div>
        <div>
          <h3>Reviews</h3>
          <button onClick={handleShowModal}>+ Review</button>
          <ReviewModal show={isModalVisible} onClose={handleCloseModal} bar={thisBar} onAddReview={handleAddReview} />
        </div>
        {thisBar.reviews && thisBar.reviews.length > 0 ? (
          thisBar.reviews.map((review) => (
            <div key={review.id}>
              <p>{review.review}</p>
            </div>
          ))
        ) : (
          <p>There are no active reviews for this bar</p>
        )}
      </div>
    </div>
  );
}
