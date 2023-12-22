/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, useEffect } from "react";
import { Modal } from "./Modal";

export function BarsShow(props) {
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
  }

  const [favorite, setFavorite] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddClick = () => {
    const params = { bar_id: props.bar.id };
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

  useEffect(() => {
    axios
      .get("http://localhost:3000/favorites.json")
      .then((response) => {
        //find the favorite that matches the current bar ID
        const userFavorite = response.data.find((favorite) => favorite.bar_id === props.bar.id);
        //set the favorite state
        console.log(userFavorite);
        setFavorite(userFavorite);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [props.bar.id]);

  return (
    <div>
      <div>
        <h1>{props.bar.name}</h1>
        {favorite ? (
          <button onClick={handleRemoveClick}>Remove Bar From Favorites</button>
        ) : (
          <button onClick={handleAddClick}>Add Bar To Favorites</button>
        )}
      </div>
      <img src={props.bar.image_url} alt="" />
      <div>
        <h3>Specials:</h3>
        <div>
          {props.bar.specials && props.bar.specials.length > 0 ? (
            props.bar.specials.map((special) => (
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
        <p>{props.bar.street_address}</p>
        <p> {props.bar.city}</p>
        <p> {props.bar.state}</p>
        <p> {props.bar.zip_code}</p>
      </div>
      <div>
        <h3>Hours</h3>
        <p> {props.bar.hours}</p>
      </div>
      <div>
        <div>
          <h3>Reviews</h3>
          <button onClick={handleShowModal}>Modal Button</button>
          <Modal show={isModalVisible} onClose={handleCloseModal} />
        </div>
        {props.bar.reviews && props.bar.reviews.length > 0 ? (
          props.bar.reviews.map((review) => (
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
