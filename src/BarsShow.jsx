/* eslint-disable react/prop-types */
export function BarsShow(props) {
  return (
    <div>
      <p>Location: {props.bar.location}</p>
      <p>Hours: {props.bar.hours}</p>
    </div>
  );
}
