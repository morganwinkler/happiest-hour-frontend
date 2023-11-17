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
      <div className="card text-bg-light" style={{margin: "25px"}}>
        <h1 style={{marginTop: "10px"}}>Add a Bar</h1>
        <form className="container" onSubmit={handleSubmit}>
          <div className="row mb-3" style={{padding: "20px"}}>
            Name: <input className="form-label" type="text" name="name" />
          </div>
          <div className="row mb-3" style={{padding: "20px"}}>
            Location: <input className="form-label" type="text" name="location" />
          </div>
          <div className="row mb-3" style={{padding: "20px"}}>
            Hours: <input className="form-label" type="text" name="hours" />
          </div>
          <div className="row mb-3" style={{padding: "20px"}}>
            Specials: <input className="form-label" type="text" name="specials" />
          </div>
          <div className="row mb-3" style={{padding: "20px"}}>
            Image URL: <input className="form-label" type="text" name="image_url" />
          </div>
          <button className="btn btn-primary" type="submit" style={{margin: "10px"}}>Add Bar</button>
        </form>
      </div>
    </div>
  );
}
