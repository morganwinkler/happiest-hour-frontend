/* eslint-disable react/prop-types */
export function BarsShow(props) {
  const handleClick = () => {
    props.onFavoriteBar(props.bar);
  };

  return (
    <div>
      <p>Location: {props.bar.location}</p>
      <p>Hours: {props.bar.hours}</p>
      <button onClick={handleClick}>Add Bar To Favorites</button>
    </div>
  );
}
