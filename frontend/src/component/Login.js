import React, { useState } from "react";

function Login({ onLogin }) {
  const [formValue, setFormValue] = useState({
    password: "",
    email: "",
  })

  function handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = formValue;
    onLogin(password, email);
  }

  function handleChange(evt) {
    const {name, value} = evt.target;
    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  return (
    <div className="auth" >
      <h2 className="auth__title">Вход</h2>
      <form name="login" className="auth__form" onSubmit={handleSubmit} noValidate>
        <input
          type="email"
          name="email"
          className="auth__input"
          placeholder="Email"
          value={formValue.email || ""}
          onChange={handleChange}
          required />
        <input
          type="password"
          name="password"
          className="auth__input"
          placeholder="Пароль"
          value={formValue.password || ""}
          onChange={handleChange}
          required />
        <button
          className="auth__submit-button"
          type="submit"
        >
          Войти
        </button>
      </form>
    </div>
  )
}

export default Login;
