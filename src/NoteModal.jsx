/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Modal.css";

export function NoteModal(props) {
  const [noteText, setNoteText] = useState("");
  const [selectedBarId, setSelectedBarId] = useState(null);

  const handleNoteChange = (event) => {
    setNoteText(event.target.value);
  };
  const handleBarClick = (barId) => {
    setSelectedBarId(barId);
  };
  const handleAddNote = () => {
    // Call the onAddNote prop with the Note text
    props.onAddNote(selectedBarId, noteText);
    props.onClose();
  };

  if (props.show) {
    return (
      <div className="modal-background">
        <section className="modal-main">
          <div className="text-center">
            <p>Choose which bar you would like to leave a note for :D</p>
          </div>
          <div className="row">
            {props.bars.map((bar) => (
              <div className="col-2" key={bar.id}>
                <button
                  className="btn btn-secondary"
                  style={{ margin: "5px", backgroundColor: selectedBarId === bar.id ? "#4282AA" : "" }}
                  onClick={() => handleBarClick(bar.id)}
                >
                  {bar.name}
                </button>
              </div>
            ))}
          </div>
          <div className=" d-flex justify-content-center mt-3">
            <textarea placeholder="Enter your note..." value={noteText} onChange={handleNoteChange} />
          </div>
          <div className=" d-flex justify-content-center mt-3">
            <button
              className="mt-3 btn btn-primary"
              style={{
                margin: "10px",
                backgroundColor: "#4282AA",
                border: "2px solid #000",
                color: "#FFF",
                textDecoration: "none",
              }}
              type="button"
              onClick={handleAddNote}
            >
              Add Note
            </button>
          </div>
          <button className="close" type="button" onClick={props.onClose}>
            &#x2715;
          </button>
        </section>
      </div>
    );
  }
}
