import React from "react";

function ImagePopup({onClose, isOpen, card, onOverlayClose}) {

  return (
    <div className={`popup popup_type_image ${isOpen ? "popup_opened" : ""}`} onClick={onOverlayClose}>
    <div className="popup__container popup__container_type_image">
      <button className="popup__button-close" type="button" aria-label="Close" onClick={onClose}></button>
      <img className="popup__img" alt={card.name} src={card.link} />
      <h2 className="popup__name">{card.name}</h2>
    </div>
  </div>
  )
}

export default ImagePopup;
