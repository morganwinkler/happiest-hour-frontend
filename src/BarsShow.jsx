/* eslint-disable react/prop-types */
import axios from "axios";

export function BarsShow(props) {
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
  }

  const handleClick = () => {
    const params = { bar_id: props.bar.id };
    console.log(params);
    axios
      .post(`http://localhost:3000/favorites.json`, params)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div>
      <h1>{props.bar.name}</h1>
      <img src={props.bar.image_url} alt="" />
      <div>
        <h3>Specials:</h3>
        <div>
          {props.bar.specials.map((special) => (
            <div key={special.id}>
              <p>{special.special}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3>Location:</h3>
        <p>{props.bar.street_address}</p>
        <p> {props.bar.city}</p>
        <p> {props.bar.state}</p>
        <p> {props.bar.zip_code}</p>
      </div>
      <p>Hours: {props.bar.hours}</p>
      <div>
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
      <button onClick={handleClick}>Add Bar To Favorites</button>
    </div>
  );
}
