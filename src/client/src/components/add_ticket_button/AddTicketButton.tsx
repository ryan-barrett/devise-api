import React, { useState } from 'react';

import './AddTicketButton.css';

function AddTicketButton() {
  const [open, setOpen] = useState(false);

  const toggleState = () => {
    if (open) {
      setOpen(false);
      console.log(open);
    }
    else {
      setOpen(true);
      console.log(open);
    }
  };

  return (
    <div className="button-container">
      <button className="new-ticket-button" onClick={toggleState}>Add</button>
    </div>
  );
}

export default AddTicketButton;
