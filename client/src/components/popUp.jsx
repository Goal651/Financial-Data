// Message.jsx
import React, { useState } from "react";



function Message() {
  const [ setShowPopup] = useState(false);

  const closePopup = () => {
    setShowPopup(false);
  };
  return (
    <div className="pop-up" id="pop-up">
      <img id="image" src="" alt="" />
      <h1 id="popupH1">Welcome</h1>
      <p id="popupP">Thank You</p>
      <button type="button" id="pop-btn" onClick={closePopup}>OK</button>
    </div>
  );
}

export default Message;


