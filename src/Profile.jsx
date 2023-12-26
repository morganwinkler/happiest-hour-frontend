/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, useEffect } from "react";
import { NoteModal } from "./NoteModal";

export function Profile(props) {
  const [user, setUser] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
  }

  const handleShowModal = () => {
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleAddNote = (barId, noteText) => {
    const params = {
      bar_id: barId,
      note: noteText,
    };
    axios
      .post("http://localhost:3000/notes.json", params)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRemoveClick = (id) => {
    axios
      .delete(`http://localhost:3000/favorites/${id}.json`)
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    axios.get(`http://localhost:3000/users/${props.userId}.json`).then((response) => {
      setUser(response.data);
    });
  }, [props.userId]);

  return (
    <div>
      <h1>My Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <div>
        <p>My Favorites:</p>
        {user.favorites && user.favorites.length > 0 ? (
          user.favorites.map((favorite) => (
            <div key={favorite.id}>
              <p>{favorite.bar}</p>
              <img src={favorite.image} alt="" />
              <button onClick={() => handleRemoveClick(favorite.id)}>Remove From Favorites</button>
            </div>
          ))
        ) : (
          <p>You do not have any favorites!</p>
        )}
      </div>
      <div>
        <p>My Reviews:</p>
        {user.reviews && user.reviews.length > 0 ? (
          user.reviews.map((review) => (
            <div key={review.id}>
              <p>
                {review.bar}: {review.review}
              </p>
              <button onClick={() => props.onDeleteReview(review.id)}>Delete Review</button>
            </div>
          ))
        ) : (
          <p>You do not have any reviews!</p>
        )}
      </div>
      <div>
        <p>My Notes:</p>
        <button onClick={handleShowModal}>+ New Note</button>
        <NoteModal show={isModalVisible} onClose={handleCloseModal} onAddNote={handleAddNote} bars={props.bars} />
        {user.notes && user.notes.length > 0 ? (
          user.notes.map((note) => (
            <div key={note.id}>
              <p>
                {note.bar}: {note.note}
              </p>
            </div>
          ))
        ) : (
          <p>You do not have any notes!</p>
        )}
      </div>
    </div>
  );
}
