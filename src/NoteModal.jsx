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
          <p>Choose which bar you would like to leave a note for :D</p>
          <div>
            {props.bars.map((bar) => (
              <div key={bar.id}>
                <button onClick={() => handleBarClick(bar.id)}>{bar.name}</button>
              </div>
            ))}
          </div>
          <textarea placeholder="Enter your note..." value={noteText} onChange={handleNoteChange} />
          <button type="button" onClick={handleAddNote}>
            Add Note
          </button>
          <button className="close" type="button" onClick={props.onClose}>
            &#x2715;
          </button>
        </section>
      </div>
    );
  }
}
