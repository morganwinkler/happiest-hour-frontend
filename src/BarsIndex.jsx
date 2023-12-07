/* eslint-disable react/prop-types */

export function BarsIndex(props) {
  return (
    <div className="card bg-light">
      <div className="row" style={{ margin: "25px" }}>
        <h1>Happiest Hour Featured Bars</h1>
      </div>
      <div className="row justify-content-center">
        {props.bars.map((bar) => (
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
