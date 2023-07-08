import React, { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isPreloading, onOverlayClose }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name, about: description });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isPreloading ? "Загрузка..." : "Сохранить"}
      onOverlayClose={onOverlayClose}>
      <label className="popup__form">
        <input
          id="input-name"
          type="text"
          name="name"
          className="popup__input popup__input_type_name"
          placeholder="Укажите имя"
          minLength="2"
          maxLength="40"
          required
          onChange={(evt) => setName(evt.target.value)}
          value={name ?? ''}
        />
        <span id="input-name-error" className="popup__error"></span>
        <input
          id="input-job"
          type="text"
          name="about"
          className="popup__input popup__input_type_job"
          placeholder="Укажите професcию"
          minLength="2"
          maxLength="200"
          required
          onChange={(evt) => setDescription(evt.target.value)}
          value={description ?? ''}
        />
        <span id="input-job-error" className="popup__error"></span>
      </label>
    </PopupWithForm>
  )
}



export default EditProfilePopup;
