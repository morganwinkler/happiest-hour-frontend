/* eslint-disable react/prop-types */
import { useState } from "react";
import { Map, Marker } from "pigeon-maps";
import { Link } from "react-router-dom";

export function MyMap(props) {
  const [currentBar, setCurrentBar] = useState(null);

  return (
    <div>
      <div>
        <button>
          <Link to="/">Switch to List View</Link>
        </button>
      </div>
      <Map height={300} defaultCenter={[33.755951, -84.357646]} defaultZoom={11}>
        {props.bars.map((bar) => (
          <Marker
            key={bar.id}
            width={50}
            anchor={[parseFloat(bar.latitude), parseFloat(bar.longitude)]}
            onClick={() => setCurrentBar(bar)}
          />
        ))}
      </Map>
      <div>
        {currentBar ? (
          <div>
            <h3> {currentBar.name} </h3>
            <img src={currentBar.image_url} alt="" />
            <button>
              <Link to={`/moreinfo/${currentBar.id}`}>More Info</Link>
            </button>
          </div>
        ) : (
          <h3>No Bar Selected</h3>
        )}
      </div>
    </div>
  );
}
