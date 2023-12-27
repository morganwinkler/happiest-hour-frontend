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
    <div className="card bg-light" style={{ marginBottom: "50px", marginTop: "50px" }}>
      <div className="row" style={{ margin: "25px" }}>
        <h1 style={{ textDecoration: "underline" }}>My Profile</h1>
        <h5>Name: {user.name}</h5>
        <h5>Email: {user.email}</h5>
      </div>
      <h3>My Favorites:</h3>
      <div className="row justify-content-center">
        {user.favorites && user.favorites.length > 0 ? (
          user.favorites.map((favorite) => (
            <div key={favorite.id} className="card " style={{ width: "18rem", margin: "5px" }}>
              <p className="card-title" style={{ margin: "10px" }}>
                {favorite.bar}
              </p>
              <img className="card-img-top" src={favorite.image} alt="" style={{ maxHeight: "200px" }} />
              <button
                className="btn btn-primary"
                style={{
                  margin: "10px",
                  backgroundColor: "#4282AA",
                  border: "2px solid #000",
                  color: "#FFF",
                  textDecoration: "none",
                }}
                onClick={() => handleRemoveClick(favorite.id)}
              >
                Remove From Favorites
              </button>
            </div>
          ))
        ) : (
          <p>You do not have any favorites!</p>
        )}
      </div>
      <div className="card" style={{ margin: "25px" }}>
        <h3 style={{ marginTop: "25px" }}>My Reviews:</h3>
        {user.reviews && user.reviews.length > 0 ? (
          user.reviews.map((review) => (
            <div key={review.id} className="row justify-content-around" style={{ marginTop: "25px" }}>
              <p className="col-4 text-start">
                {review.bar}: {review.review}
              </p>
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
            </div>
          ))
        ) : (
          <p>You do not have any reviews!</p>
        )}
      </div>
      <div className="card" style={{ margin: "25px" }}>
        <div className="row justify-content-between" style={{ marginTop: "25px" }}>
          <div className="col-4 text-start" style={{ paddingLeft: "25px" }}>
            <h3>My Notes:</h3>
          </div>
          <div className="col-4 text-end">
            <button
              className="btn btn-primary "
              style={{
                margin: "10px",
                backgroundColor: "#8DA89F",
                border: "2px solid #000",
                color: "black",
                textDecoration: "none",
              }}
              onClick={handleShowModal}
            >
              + New Note
            </button>
            <NoteModal show={isModalVisible} onClose={handleCloseModal} onAddNote={handleAddNote} bars={props.bars} />
          </div>
        </div>
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
