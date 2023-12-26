/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

export function BarsIndex(props) {
  const [filter, setFilter] = useState(null);
  return (
    <div>
      <div>
        <h1>Happiest Hour Featured Bars</h1>
      </div>
      <form>
        <h3>Filter by Category:</h3>
        <input type="button" value="Liquor" onClick={(event) => setFilter(event.target.value)} />
        <input type="button" value="Beer" onClick={(event) => setFilter(event.target.value)} />
        <input type="button" value="Wine" onClick={(event) => setFilter(event.target.value)} />
        <input type="button" value="Frozen" onClick={(event) => setFilter(event.target.value)} />
        <input type="button" value="Shots" onClick={(event) => setFilter(event.target.value)} />
        <input type="button" value="Craft" onClick={(event) => setFilter(event.target.value)} />
        <input type="button" value="Clear Filters" onClick={() => setFilter(null)} />
      </form>
      <div>
        {props.bars
          .filter((bar) => !filter || bar.categories.includes(filter))
          .map((bar) => (
            <div key={bar.id}>
              <h2>{bar.name}</h2>
              <img src={bar.image_url} />

              <div>
                {bar.specials.map((special) => (
                  <div key={special.id}>
                    <p>{special.special}</p>
                  </div>
                ))}
              </div>

              <button>
                <Link to={`/moreinfo/${bar.id}`}>More Info</Link>
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
