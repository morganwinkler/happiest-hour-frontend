/* eslint-disable react/prop-types */
import { useState } from "react";
import { Map, Marker } from "pigeon-maps";
import { Link } from "react-router-dom";

export function MyMap(props) {
  const [currentBar, setCurrentBar] = useState(null);

  return (
    <div className="card bg-light" style={{ marginBottom: "50px", marginTop: "50px", padding: "50px" }}>
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
          <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
            Switch to List View
          </Link>
        </button>
      </div>
      <div style={{ padding: "25px" }}>
        <Map height="60vh" width="100%" defaultCenter={[33.755951, -84.357646]} defaultZoom={11}>
          {props.bars.map((bar) => (
            <Marker
              key={bar.id}
              width={50}
              anchor={[parseFloat(bar.latitude), parseFloat(bar.longitude)]}
              onClick={() => setCurrentBar(bar)}
            />
          ))}
        </Map>
      </div>
      <div className="row justify-content-center">
        {currentBar ? (
          <div className="card" style={{ maxWidth: "300px" }}>
            <h3 className="card-title"> {currentBar.name} </h3>
            <img src={currentBar.image_url} alt="" className="card-img-top" style={{ maxHeight: "250px" }} />
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
              <Link to={`/moreinfo/${currentBar.id}`} style={{ color: "inherit", textDecoration: "inherit" }}>
                More Info
              </Link>
            </button>
          </div>
        ) : (
          <h3>No Bar Selected</h3>
        )}
      </div>
    </div>
  );
}
