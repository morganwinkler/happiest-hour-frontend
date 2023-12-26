import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { BarsShow } from "./BarsShow";
import { Login } from "./Login";
import { BarsIndex } from "./BarsIndex";
import { Signup } from "./Signup";
import { Profile } from "./Profile";

export function Content() {
  const [bars, setBars] = useState([]);
  const [errors, setErrors] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const handleSubmit = (params) => {
    console.log("submitting login form");
    setErrors([]);
    axios
      .post("http://localhost:3000/sessions.json", params)
      .then((response) => {
        console.log(response.data);
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

  useEffect(handleIndexBars, []);

  let homePage;
  if (localStorage.jwt === undefined) {
    homePage = (
      <div>
        <Signup />
        <Login handleSubmit={handleSubmit} errors={errors} />
      </div>
    );
  } else {
    homePage = (
      <div>
        <BarsIndex bars={bars} />
      </div>
    );
  }

  return (
    <div className="container text-center">
      <Routes>
        <Route path="/" element={homePage} />
        <Route path="/moreinfo/:bar_id" element={<BarsShow />} />
        <Route path="/myprofile" element={<Profile userId={userId} />} />
      </Routes>
    </div>
  );
}
