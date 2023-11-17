/* eslint-disable react/prop-types */
export function BarsShow(props) {

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUpdateBar(props.bar.id, params);
    // event.target.reset();
  };

  const handleClick = () => {
    props.onDestroyBar(props.bar)
  };

  return (
    <div>
      <p>Location: {props.bar.location}</p>
      <p>Hours: {props.bar.hours}</p>
      <form onSubmit={handleSubmit} >
      <div>
          Name: <input type="text" name="name" defaultValue={props.bar.name}/>
        </div>
        <div>
          Location: <input type="text" name="location"  defaultValue={props.bar.location} />
        </div>
        <div>
          Hours: <input type="text" name="hours"defaultValue={props.bar.hours}/>
        </div>
        <div>
          Specials: <input type="text" name="specials" defaultValue={props.bar.specials}/>
        </div>
        <div>
          Image URL: <input type="text" name="image_url" defaultValue={props.bar.image_url} />
        </div>
        <button type="submit">Update Bar</button>
      </form>
      <button onClick={handleClick}>Delete Bar</button>
    </div>
  );
}
