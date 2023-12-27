/* eslint-disable react/prop-types */

export function Login(props) {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.handleSubmit(params);
  };
  return (
    <div id="login" className="card text-bg-light" style={{ margin: "25px" }}>
      <h1 style={{ marginTop: "10px" }}>Login</h1>
      <ul>
        {props.errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleFormSubmit}>
        <div className="row mb-3" style={{ padding: "20px" }}>
          Email: <input name="email" type="email" />
        </div>
        <div className="row mb-3" style={{ padding: "20px" }}>
          Password: <input name="password" type="password" />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ margin: "10px", backgroundColor: "#4282AA", border: "2px solid #000" }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
