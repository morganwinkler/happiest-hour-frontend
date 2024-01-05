import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { BarsShow } from "./BarsShow";
import { Login } from "./Login";
import { BarsIndex } from "./BarsIndex";
import { Signup } from "./Signup";
import { Profile } from "./Profile";
import { MyMap } from "./Map";

export function Content() {
  const [bars, setBars] = useState([]);
  const [errors, setErrors] = useState([]);
  const [userId, setUserId] = useState(null);

  const handleSubmit = (params) => {
    console.log("submitting login form");
    setErrors([]);
    axios
      .post("http://localhost:3000/sessions.json", params)
      .then((response) => {
        setUserId(response.data.user_id);
        localStorage.setItem("userId", response.data.user_id);
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response);
        setErrors(["Invalid email or password"]);
      });
  };

  const handleIndexBars = () => {
    axios.get("http://localhost:3000/bars.json").then((response) => {
      setBars(response.data);
    });
  };

  const handleDeleteReview = (id) => {
    axios.delete(`http://localhost:3000/reviews/${id}.json`).then((response) => {
      console.log(response.data);
      window.location.reload();
    });
  };

  useEffect(handleIndexBars, []);
  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, [userId]);

  let homePage;
  if (localStorage.jwt === undefined) {
    homePage = (
      <div>
        <img
          src="/images/happiest.png"
          alt=""
          className="img-fluid rounded mx-auto d-block"
          style={{ marginTop: "20px" }}
        />
        <div className="row">
          <div className="col-md-6">
            <Signup />
          </div>
          <div className="col-md-6">
            <Login handleSubmit={handleSubmit} errors={errors} />
          </div>
        </div>
      </div>
    );
  } else {
    homePage = (
      <div>
        <BarsIndex bars={bars} userId={userId} />
      </div>
    );
  }

  return (
    <div className="container text-center">
      <Routes>
        <Route path="/mapview" element={<MyMap bars={bars} />} />
        <Route path="/" element={homePage} />
        <Route path="/moreinfo/:bar_id" element={<BarsShow userId={userId} onDeleteReview={handleDeleteReview} />} />
        <Route
          path="/myprofile"
          element={<Profile userId={userId} bars={bars} onDeleteReview={handleDeleteReview} />}
        />
      </Routes>
    </div>
  );
}
