import axios from "axios";
import { useState } from "react";

const jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export function Login() {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/sessions.json", params)
      .then((response) => {
        console.log(response.data);
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        event.target.reset();
      })
      .catch((error) => {
        console.log(error.response);
        setErrors(["Invalid email or password"]);
      });
  };

  return (
    <div id="login" className="card text-bg-light" style={{ margin: "25px" }}>
      <h1 style={{ marginTop: "10px" }}>Login</h1>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3" style={{ padding: "20px" }}>
          Email: <input name="email" type="email" />
        </div>
        <div className="row mb-3" style={{ padding: "20px" }}>
          Password: <input name="password" type="password" />
        </div>
        <button type="submit" className="btn btn-primary" style={{ margin: "10px" }}>
          Login
        </button>
      </form>
    </div>
  );
}
