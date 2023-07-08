import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const handleClick = () => onCardClick(card);
  const handleLikeClick = () => onCardLike(card);
  const handleDeleteClick = () => onCardDelete(card);

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((card) => card._id === currentUser._id);
  const cardLikeButtonClassName = (`element__button ${isLiked && 'element__button_active'}`);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <article className="element">
        {isOwn && (
          <button className="element__basket" onClick={handleDeleteClick}></button>
        )}

        <img className="element__img" alt={card.name} src={card.link} onClick={handleClick} />
        <div className="element__wrap">
          <h2 className="element__title">{card.name}</h2>
          <div className="element__like-group">
            <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
            <span className="element__span">{card.likes.length}</span>
          </div>
        </div>
      </article>
    </CurrentUserContext.Provider>
  )
}

export default Card;
