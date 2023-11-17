import { BarsIndex } from "./BarsIndex";
import axios from "axios";
import { useState, useEffect } from "react";
import { BarNew } from "./BarNew";
import { Modal } from "./Modal";


export function Content() {

  const [bars, setBars] = useState([]);
  const [isBarsVisible, setIsBarsVisible] = useState(false);
  const [currentBar, setCurrentBar] = useState({});

  const handleIndexBars = () => {
    console.log("handleIndexBars");
    axios.get("http://localhost:3000/bars.json").then((response) => {
      console.log(response.data);
      setBars(response.data);
    })
  }

  const handleCreateBar = (params) => {
    console.log("handleCreateBar", params);
    axios.post("http://localhost:3000/bars.json", params)
  }

  const handleShowBar = (bar) => {
    setIsBarsVisible(true);
    setCurrentBar(bar);
  }

  const handleClose = () => {
    setIsBarsVisible(false);
  }
  useEffect(handleIndexBars, []);

  return (
    <div>
      <BarNew onCreateBar={handleCreateBar} />
      <BarsIndex  bars={bars} onShowBar={handleShowBar} />
      <Modal show={isBarsVisible} onClose={handleClose}>
        <h1>Testing testing</h1>
      </Modal>
    </div>
  );
}
