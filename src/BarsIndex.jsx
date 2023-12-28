/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

export function BarsIndex(props) {
  const [filter, setFilter] = useState(null);
  return (
    <div className="card bg-light" style={{ marginBottom: "50px", marginTop: "50px" }}>
      <div className="row" style={{ margin: "25px" }}>
        <h1 style={{ textDecoration: "underline" }}>Happiest Hour Featured Bars</h1>
      </div>
      <div>
        <button
          className="btn btn-primary"
          style={{
            margin: "10px",
            backgroundColor: "#4282AA",
            border: "2px solid #000",
            color: "#FFF",
            textDecoration: "none",
          }}
        >
          <Link to="/mapview" style={{ color: "inherit", textDecoration: "inherit" }}>
            Switch to Map View
          </Link>
        </button>
      </div>
      <form className="container" style={{ marginTop: "25px", marginBottom: "25px" }}>
        <h3>Filter by Category:</h3>
        <input
          type="button"
          value="Liquor"
          onClick={(event) => setFilter(event.target.value)}
          style={{
            margin: "5px",
            border: "solid black 2px",
            backgroundColor: filter === "Liquor" ? "lightblue" : "",
            borderRadius: "5px",
          }}
        />
        <input
          type="button"
          value="Beer"
          onClick={(event) => setFilter(event.target.value)}
          style={{
            margin: "5px",
            border: "solid black 2px",
            backgroundColor: filter === "Beer" ? "lightblue" : "",
            borderRadius: "5px",
          }}
        />
        <input
          type="button"
          value="Wine"
          onClick={(event) => setFilter(event.target.value)}
          style={{
            margin: "5px",
            border: "solid black 2px",
            backgroundColor: filter === "Wine" ? "lightblue" : "",
            borderRadius: "5px",
          }}
        />
        <input
          type="button"
          value="Frozen"
          onClick={(event) => setFilter(event.target.value)}
          style={{
            margin: "5px",
            border: "solid black 2px",
            backgroundColor: filter === "Frozen" ? "lightblue" : "",
            borderRadius: "5px",
          }}
        />
        <input
          type="button"
          value="Shots"
          onClick={(event) => setFilter(event.target.value)}
          style={{
            margin: "5px",
            border: "solid black 2px",
            backgroundColor: filter === "Shots" ? "lightblue" : "",
            borderRadius: "5px",
          }}
        />
        <input
          type="button"
          value="Craft"
          onClick={(event) => setFilter(event.target.value)}
          style={{
            margin: "5px",
            border: "solid black 2px",
            backgroundColor: filter === "Craft" ? "lightblue" : "",
            borderRadius: "5px",
          }}
        />
        <input
          type="button"
          value="Clear Filters"
          onClick={() => setFilter(null)}
          style={{ margin: "5px", border: "solid black 2px", borderRadius: "5px" }}
        />
      </form>
      <div className="row justify-content-center">
        {props.bars
          .filter((bar) => !filter || bar.categories.includes(filter))
          .map((bar) => (
            <div key={bar.id} className="card " style={{ width: "18rem", margin: "5px" }}>
              <h2 className="card-title" style={{ margin: "10px" }}>
                {bar.name}
              </h2>
              <img className="card-img-top" src={bar.image_url} style={{ maxHeight: "200px" }} />

              <div className="card-text" style={{ margin: "5px" }}>
                {bar.specials.map((special) => (
                  <div key={special.id}>
                    <p>{special.special}</p>
                  </div>
                ))}
              </div>

              <button
                className="btn btn-primary"
                style={{
                  margin: "10px",
                  backgroundColor: "#4282AA",
                  border: "2px solid #000",
                  color: "#FFF",
                  textDecoration: "none",
                }}
              >
                <Link to={`/moreinfo/${bar.id}`} style={{ color: "inherit", textDecoration: "inherit" }}>
                  More Info
                </Link>
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
