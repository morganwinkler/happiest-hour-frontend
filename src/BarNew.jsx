/* eslint-disable react/prop-types */
export function BarNew(props) {

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateBar(params);
    event.target.reset();
  };


  return (
    <div>
      <h1>Add a Bar</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Add Bar</button>
      </form>
    </div>
  );
}
