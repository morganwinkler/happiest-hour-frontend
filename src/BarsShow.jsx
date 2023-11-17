/* eslint-disable react/prop-types */
export function BarsShow(props) {

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUpdateBar(props.bar.id, params, () =>
    event.target.reset());
  };

  return (
    <div>
      <p>Location: {props.bar.location}</p>
      <p>Hours: {props.bar.hours}</p>
      <form onSubmit={handleSubmit} >
      <div>
          Name: <input type="text" name="name" />
        </div>
        <div>
          Location: <input type="text" name="location" />
        </div>
        <div>
          Hours: <input type="text" name="hours" />
        </div>
        <div>
          Specials: <input type="text" name="specials" />
        </div>
        <div>
          Image URL: <input type="text" name="image_url" />
        </div>
        <button type="submit">Update Bar</button>
      </form>
    </div>
  );
}
