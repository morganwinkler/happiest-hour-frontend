/* eslint-disable react/prop-types */
import { useState } from "react";

export function BarsIndex(props) {
  const [filter, setFilter] = useState("Liquor" || "Craft" || "Beer" || "Wine" || "Frozen" || "Shots" || "none");

  return (
    <div className="card bg-light">
      <div className="row" style={{ margin: "25px" }}>
        <h1>Happiest Hour Featured Bars</h1>
      </div>
      <form className="row" style={{ margin: "10px" }}>
        <h3>Filter by Category:</h3>
        <input type="button" value="Liquor" onClick={(event) => setFilter(event.target.value)} />
        <input type="button" value="Beer" onClick={(event) => setFilter(event.target.value)} />
        <input type="button" value="Wine" onClick={(event) => setFilter(event.target.value)} />
        <input type="button" value="Frozen" onClick={(event) => setFilter(event.target.value)} />
        <input type="button" value="Shots" onClick={(event) => setFilter(event.target.value)} />
        <input type="button" value="Craft" onClick={(event) => setFilter(event.target.value)} />
      </form>
      <div className="row justify-content-center">
        {props.bars
          .filter((bar) => bar.categories.includes(filter))
          .map((bar) => (
            <div key={bar.id} className="card " style={{ width: "18rem", margin: "5px" }}>
              <h2 className="card-title" style={{ margin: "10px" }}>
                {bar.name}
              </h2>
              <img className="card-img-top" src={bar.image_url} style={{ maxHeight: "250px" }} />

              <div className="card-text" style={{ margin: "5px" }}>
                {bar.specials.map((special) => (
                  <div key={special.id}>
                    <p>{special.special}</p>
                  </div>
                ))}
              </div>

              <button className="btn btn-primary" onClick={() => props.onShowBar(bar)}>
                More Info
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
