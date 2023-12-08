import { BarsIndex } from "./BarsIndex";
import axios from "axios";
import { useState, useEffect } from "react";
import { BarNew } from "./BarNew";
import { Modal } from "./Modal";
import { BarsShow } from "./BarsShow";

export function Content() {
  const [bars, setBars] = useState([]);
  const [isBarsVisible, setIsBarsVisible] = useState(false);
  const [currentBar, setCurrentBar] = useState({});

  const handleIndexBars = () => {
    console.log("handleIndexBars");
    axios.get("http://localhost:3000/bars.json").then((response) => {
      console.log(response.data);
      setBars(response.data);
    });
  };

  const handleCreateBar = (params) => {
    console.log("handleCreateBar", params);
    axios.post("http://localhost:3000/bars.json", params);
  };

  const handleShowBar = (bar) => {
    setIsBarsVisible(true);
    setCurrentBar(bar);
  };

  const handleClose = () => {
    setIsBarsVisible(false);
  };

  const handleUpdateBar = (id, params) => {
    axios.patch(`http://localhost:3000/bars/${id}.json`, params).then((response) => {
      setBars(
        bars.map((bar) => {
          if (bar.id === response.data.id) {
            return response.data;
          } else {
            return bar;
          }
        })
      );
      handleClose;
    });
  };

  const handleDestroyBar = (bar) => {
    console.log("handleDestroyBar", bar);
    axios.delete(`http://localhost:3000/bars/${bar.id}.json`).then((response) => {
      setBars(bars.filter((p) => p.id !== bar.id));
      console.log(response);
      handleClose();
    });
  };

  useEffect(handleIndexBars, []);

  return (
    <div className="container text-center">
      <BarNew onCreateBar={handleCreateBar} />
      <BarsIndex bars={bars} onShowBar={handleShowBar} />
      <Modal show={isBarsVisible} onClose={handleClose}>
        <BarsShow bar={currentBar} onUpdateBar={handleUpdateBar} onDestroyBar={handleDestroyBar} />
      </Modal>
    </div>
  );
}
