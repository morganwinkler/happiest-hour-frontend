import { BarsIndex } from "./BarsIndex";
import axios from "axios";
import { useState, useEffect } from "react";


export function Content() {

  const [bars, setBars] = useState([]);

  const handleIndexBars = () => {
    console.log("handleIndexBars");
    axios.get("http://localhost:3000/bars.json").then((response) => {
      console.log(response.data);
      setBars(response.data);
    })
  }

  useEffect(handleIndexBars, []);

  return (
    <div>
      <BarsIndex  bars={bars}/>
    </div>
  );
}
