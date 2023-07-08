import React, { useContext, useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isPreloading, onOverlayClose}) {
  const currentUser = useContext(CurrentUserContext);
  const inputAvatar = useRef();

  useEffect(() => {
    inputAvatar.current.value = ''
  }, [currentUser, isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputAvatar.current.value,
    })
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isPreloading ? "Загрузка..." : "Сохранить"}
      onOverlayClose={onOverlayClose}>

      <label className="popup__form">
        <input
          id="input-avatar"
          ref={inputAvatar}
          type="url"
          name="avatar"
          className="popup__input popup__input_type_link"
          placeholder="Ссылка на аватар"
          required />
        <span id="input-avatar-error" className="popup__error"></span>
      </label>
    </PopupWithForm>
  )

}

export default EditAvatarPopup
