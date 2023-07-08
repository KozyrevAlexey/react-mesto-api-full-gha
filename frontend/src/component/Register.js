import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  })

  function handleChange(evt) {
    const { name, value} = evt.target;
    setUserData({
      ...userData,
      [name]: value
    })
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = userData;
    onRegister(password, email);
  }

  return (
    <div className="auth" onSubmit={handleSubmit}>
      <h2 className="auth__title">Регистрация</h2>
      <form name="register" className="auth__form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          className="auth__input"
          placeholder="Email"
          onChange={handleChange}
          value={userData.email}
          required />
        <input
          type="password"
          name="password"
          className="auth__input"
          placeholder="Пароль"
          onChange={handleChange}
          value={userData.password}
          required />
        <button
          className="auth__submit-button"
          type="submit"
        >
          Зарегистрироваться
        </button>
        <Link className="auth__link" to="/sign-in">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  )
}

export default Register;
