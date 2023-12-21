import { BarsIndex } from "./BarsIndex";
import axios from "axios";
import { useState, useEffect } from "react";
import { BarsShow } from "./BarsShow";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { Logout } from "./Logout";
import { Routes, Route } from "react-router-dom";

export function Content() {
  const [bars, setBars] = useState([]);
  const [currentBar, setCurrentBar] = useState({});
  const [favoriteBars, setFavoriteBars] = useState([]);

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
        <Login />
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
      {/* <div>{homePage}</div> */}
      <Routes>
        <Route path="/" element={homePage} />
        <Route
          path="/moreinfo"
          element={<BarsShow bar={currentBar} onFavoriteBar={handleFavoriteBars} onShowBar={handleShowBar} />}
        />
      </Routes>
      <Logout />
    </div>
  );
}
