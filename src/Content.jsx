import { BarsIndex } from "./BarsIndex";
import axios from "axios";
import { useState, useEffect } from "react";
import { BarNew } from "./BarNew";
import { Modal } from "./Modal";
import { BarsShow } from "./BarsShow";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { Logout } from "./Logout";

export function Content() {
  const [bars, setBars] = useState([]);
  const [isBarsVisible, setIsBarsVisible] = useState(false);
  const [currentBar, setCurrentBar] = useState({});
  const [favoriteBars, setFavoriteBars] = useState([]);

  const handleIndexBars = () => {
    axios.get("http://localhost:3000/bars.json").then((response) => {
      setBars(response.data);
    });
  };

  // const handleCreateBar = (params) => {
  //   console.log("handleCreateBar", params);
  //   axios.post("http://localhost:3000/bars.json", params);
  // };

  const handleShowBar = (bar) => {
    setIsBarsVisible(true);
    setCurrentBar(bar);
  };

  const handleClose = () => {
    setIsBarsVisible(false);
  };

  // const handleUpdateBar = (id, params) => {
  //   axios.patch(`http://localhost:3000/bars/${id}.json`, params).then((response) => {
  //     setBars(
  //       bars.map((bar) => {
  //         if (bar.id === response.data.id) {
  //           return response.data;
  //         } else {
  //           return bar;
  //         }
  //       })
  //     );
  //     handleClose;
  //   });
  // };

  const handleFavoriteBars = (bar) => {
    axios.get(`http://localhost:3000/bars/${bar.id}.json`).then((response) => {
      setFavoriteBars((favoriteBars) => [...favoriteBars, response.data]);
    });
  };

  // const handleDestroyBar = (bar) => {
  //   console.log("handleDestroyBar", bar);
  //   axios.delete(`http://localhost:3000/bars/${bar.id}.json`).then((response) => {
  //     setBars(bars.filter((p) => p.id !== bar.id));
  //     console.log(response);
  //     handleClose();
  //   });
  // };

  useEffect(handleIndexBars, []);
  // prints a console message each time a new bar is added to favorites
  useEffect(() => {
    console.log("Updated favoriteBars:", favoriteBars);
  }, [favoriteBars]);

  return (
    <div className="container text-center">
      <div>
        <Signup />
        <Login />
      </div>
      <BarNew
      // onCreateBar={handleCreateBar}
      />
      <BarsIndex bars={bars} onShowBar={handleShowBar} />
      <Modal show={isBarsVisible} onClose={handleClose}>
        <BarsShow
          bar={currentBar}
          // onUpdateBar={handleUpdateBar}
          // onDestroyBar={handleDestroyBar}
          onFavoriteBar={handleFavoriteBars}
        />
      </Modal>
      <Logout />
    </div>
  );
}
