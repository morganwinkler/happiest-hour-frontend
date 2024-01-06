import axios from "axios";
import { useState } from "react";

export function Signup() {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/users.json", params)
      .then((response) => {
        console.log(response.data);
        setSuccessMessage("User created successfully!");
        event.target.reset();
      })
      .catch((error) => {
        setStatus(error.response.status);
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div id="signup" className="card text-bg-light" style={{ margin: "25px" }}>
      <h1 style={{ marginTop: "10px" }}>Sign Up</h1>
      {status ? <img src={`https://http.dog/${status}.jpg`} /> : null}
      {successMessage ? <p style={{ color: "green" }}>{successMessage}</p> : null}
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
          Name: <input name="name" type="text" />
        </div>
        <div className="row mb-3" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
          Email: <input name="email" type="email" />
        </div>
        <div className="row mb-3" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
          Password: <input name="password" type="password" />
        </div>
        <div className="row mb-3" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
          Confirm Password: <input name="password_confirmation" type="password" />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ margin: "10px", backgroundColor: "#4282AA", border: "2px solid #000" }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
