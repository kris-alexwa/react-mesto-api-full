import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner === currentUser.id;
    const isLiked = props.card.likes.some(item => item === currentUser.id);

    const cardDeleteButtonClassName = (
        `button button_icon elements__delete ${isOwn ? 'button_visibility' : ''}`
      ); 

      const cardLikeButtonClassName = (
          `button button_icon button_light elements__like ${isLiked ? 'elements__like_active' : ''}`
      )

    function handleLikeClick() {
        props.onCardLike(props.card, isLiked)
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }
    
    return (
        <li className="elements__list-item">
            <img className="elements__image" src={props.card.link} onClick={() => props.onImagePopup(props.card.name, props.card.link)} alt={props.card.name} />
            <div className="elements__wrapper">
                <h2 className="elements__title">{props.card.name}</h2>
                <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
                <div className="elements__like-container">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className="elements__like-counter">{props.card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card