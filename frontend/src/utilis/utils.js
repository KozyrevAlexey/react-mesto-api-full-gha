// /** Объект валидации */

const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

/**Данные для обращения к серверу */
const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers:{
    'Content-Type': "application/json",
    authorization: '433d83bc-6b8b-4de8-9d1d-be42c9389f4e'
  }
}

export { formValidationConfig, apiConfig };

