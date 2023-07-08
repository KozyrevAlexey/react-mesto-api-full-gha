import React from "react";

function PopupWithForm({ name, title, onClose, isOpen, children, onSubmit, buttonText, onOverlayClose }) {

  return (
    <div className={`popup  ${isOpen ? "popup_opened" : ""}`} onClick={onOverlayClose}>
      <div className="popup__container">
        <button className="popup__button-close" type="button" aria-label="Close" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form className={`popup__form popup__form_type_${name}`} name={`form-${name}`} onSubmit={onSubmit}>
          {children}
          <button className="popup__button popup__button-submit" type="submit">{buttonText}</button>
        </form>
      </div>
    </div>
  )
}


export default PopupWithForm;
