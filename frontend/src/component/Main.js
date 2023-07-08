import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar" onClick={onEditAvatar}>
          <img src={currentUser.avatar} alt={currentUser.name} className="profile__img" />
        </div>
        <div className="profile-info">
          <div className="profile-info__wrap">
            <h1 className="profile-info__title">{currentUser.name}</h1>
            <p className="profile-info__intro">{currentUser.about}</p>
          </div>
          <button className="profile__edit-buton" type="button" onClick={onEditProfile}></button>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}>
        </button>
      </section>
      <section className="elements">
        {
          cards.map((card) => (
            <Card card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} key={card._id} />
          ))
        }
      </section>
    </main>
  )
}

export default Main;
