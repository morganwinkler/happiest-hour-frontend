/* eslint-disable react/prop-types */

export function BarsIndex(props) {
  return (
    <div>
      <h1>Happiest Hour Featured Bars</h1>
      {props.bars.map((bar) => (
        <div key={bar.id}>
          <h2>{bar.name}</h2>
          <img src={bar.image_url} alt="" />
          <p>{bar.specials}</p>
          <button onClick={() => props.onShowBar(bar)}>More Info</button>
        </div>
      ))}
    </div>
  );
}
