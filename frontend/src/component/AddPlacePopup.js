import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isPreloading, onOverlayClose }) {
  const [placeName, setPlaceName] = useState("");
  const [placeLink, setPlaceLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: placeName,
      link: placeLink,
    });
  }

  useEffect(() => {
    setPlaceName("");
    setPlaceLink("");
  }, [isOpen])

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isPreloading ? "Сохранение..." : "Создать"}
      onOverlayClose={onOverlayClose}>
      <input
        id="input-title"
        type="text"
        name="name"
        className="popup__input popup__input_type_title"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={placeName ?? ""}
        onChange={(e) => setPlaceName(e.target.value)}
      />
      <span id="input-title-error" className="popup__error"></span>
      <input
        id="input-link"
        type="url"
        name="link"
        className="popup__input popup__input_type_link"
        placeholder="Ссылка на картинку"
        required
        value={placeLink ?? ""}
        onChange={(e) => setPlaceLink(e.target.value)}
      />
      <span id="input-link-error" className="popup__error"></span>
    </PopupWithForm>

  )

}

export default AddPlacePopup;

