import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom"
import Header from "./Header";
import Main from "./Main.js";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utilis/api";
import * as auth from "../utilis/auth"

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isPreloading, setIsPreloading] = useState(false);
  const [email, setEmail] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false)
  const [tooltipTitle, setTooltipTitle] = useState('')
  const [tooltipIcon, setTooltipIcon] = useState('')

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfoApi(), api.getInitialCards()])
        .then(([user, card]) => {
          setCurrentUser(user);
          setCards(card);
        })
        .catch((err) => alert(err))
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function hendleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function hendleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => alert(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(state => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => alert(err))
  }

  function handleUpdateUser(value) {
    setIsPreloading(true)
    api
      .setUserInfoApi(value)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => alert(err))
      .finally(() => setIsPreloading(false))
  }

  function handleUpdateAvatar(value) {
    setIsPreloading(true)
    api
      .setUserAvatar(value)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => alert(err))
      .finally(() => setIsPreloading(false))
  }

  function handleAddPlaceSubmit(card) {
    setIsPreloading(true);
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => alert(err))
      .finally(() => setIsPreloading(false))
  }

  function handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  function onRegister() {
    setTooltipTitle("Вы успешно зарегистрировались!");
    setTooltipIcon("success");
    setIsInfoTooltipPopupOpen(true);
  }

  function onError() {
    setTooltipTitle("Что-то пошло не так!");
    setTooltipIcon("error");
    setIsInfoTooltipPopupOpen(true);
  }

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          navigate("/");
        })
        .catch(err => console.log(err));
    }
  }

  useEffect(() => {
    checkToken();
  }, []);

  function handleLogin(password, email) {
    auth.authorize(password, email)
      .then(res => {
        localStorage.setItem('jwt', res.token)
        setLoggedIn(true);
        navigate("/")
      })
      .catch(err => {
        onError();

        console.log(err);
      });
  }

  function handleRegister(password, email) {
    auth.register(password, email)
      .then(() => {
        navigate("/sign_in");
        onRegister();
      })
      .catch(err => {
        onError();
        console.log(err);
      });
  }

  function signOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} signOut={signOut} loggedIn={loggedIn} />
        <Routes>
          <Route
            path="/"
            element={<ProtectedRoute
              element={Main}
              loggedIn={loggedIn}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={hendleEditProfileClick}
              onAddPlace={hendleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
            />}
          />
          <Route
            path="/sign-in"
            element={
              <Login
                onLogin={handleLogin}
                setEmail={setEmail} />}
          />
          <Route
            path="/sign-up"
            element={
              <Register
                onRegister={handleRegister} />}
          />
          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace />}
          />
        </Routes>
        {loggedIn && <Footer />}

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isPreloading={isPreloading}
          onOverlayClose={handleOverlayClose}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isPreloading={isPreloading}
          onOverlayClose={handleOverlayClose}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isPreloading={isPreloading}
          onOverlayClose={handleOverlayClose}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          onOverlayClose={handleOverlayClose}
        />

        <InfoTooltip
          title={tooltipTitle}
          tooltipIcon={tooltipIcon}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          onOverlayClose={handleOverlayClose}
        />

      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;

