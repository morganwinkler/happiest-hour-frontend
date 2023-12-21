/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, useEffect } from "react";

export function Profile(props) {
  const [user, setUser] = useState({});
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
  }

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
              <p>{favorite.bar_id}</p>
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
              <p>{review.bar_id}</p>
              <p>{review.review}</p>
            </div>
          ))
        ) : (
          <p>You do not have any reviews!</p>
        )}
      </div>
      <div>
        <p>My Notes:</p>
        {user.notes && user.notes.length > 0 ? (
          user.notes.map((note) => (
            <div key={note.id}>
              <p>{note.bar_id}</p>
              <p>{note.note}</p>
            </div>
          ))
        ) : (
          <p>You do not have any notes!</p>
        )}
      </div>
    </div>
  );
}
