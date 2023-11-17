import { BarsIndex } from "./BarsIndex";
import axios from "axios";
import { useState, useEffect } from "react";
import { BarNew } from "./BarNew";



export function Content() {

  const [bars, setBars] = useState([]);

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

  useEffect(handleIndexBars, []);

  return (
    <div>
      <BarNew onCreateBar={handleCreateBar} />
      <BarsIndex  bars={bars}/>
    </div>
  );
}
