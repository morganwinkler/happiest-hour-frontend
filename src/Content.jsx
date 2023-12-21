import { BarsIndex } from "./BarsIndex";
import axios from "axios";
import { useState, useEffect } from "react";
import { BarsShow } from "./BarsShow";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { Routes, Route } from "react-router-dom";

export function Content() {
  const [bars, setBars] = useState([]);
  const [currentBar, setCurrentBar] = useState({});
  const [favoriteBars, setFavoriteBars] = useState([]);
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

  const handleShowBar = (bar) => {
    setCurrentBar(bar);
  };

  const handleFavoriteBars = (bar) => {
    axios.get(`http://localhost:3000/bars/${bar.id}.json`).then((response) => {
      setFavoriteBars((favoriteBars) => [...favoriteBars, response.data]);
    });
  };

  useEffect(handleIndexBars, []);
  useEffect(() => {
    console.log("Updated favoriteBars:", favoriteBars);
  }, [favoriteBars]);

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
        <BarsIndex bars={bars} onShowBar={handleShowBar} />
      </div>
    );
  }

  return (
    <div className="container text-center">
      <Routes>
        <Route path="/" element={homePage} />
        <Route
          path="/moreinfo"
          element={
            <BarsShow bar={currentBar} onFavoriteBar={handleFavoriteBars} onShowBar={handleShowBar} userId={userId} />
          }
        />
      </Routes>
    </div>
  );
}
