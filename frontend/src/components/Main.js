import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import burgerIcon from '../images/icons/burger-icon.svg';
import closeIcon from '../images/icons/close-menu-icon.svg'

import Header from './Header';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [isOpen, setIsOpen] = React.useState(false)

    function handleClickBurgerBtn() {
        setIsOpen(!isOpen)
    }

    const classBurger = `header__user-info ${isOpen ? 'header__visibility' : ''}`
    const iconMenu = `${isOpen ? closeIcon : burgerIcon}`;
    const classHeader = `header ${isOpen ?  'header__border': ''}`

    const button = <button className="header__burger-btn" ><img className="header__icon" onClick={handleClickBurgerBtn} src={iconMenu}></img></button>

    return (
        <>
            <div className={classBurger}>
                <p className="header__email header__email_burger">{props.userData.email}</p>
                <button onClick={props.signOut} className="header__logout header__logout_burger">Выйти</button>
            </div>
            <Header classHeader={classHeader}>
                <p className="header__email">{props.userData.email}</p>
                <button onClick={props.signOut} className="header__logout">Выйти</button>
                {button}
            </Header>
            <main className="content">
                <section className="profile">
                    <div className="profile__avatar-wrapper"><img className="profile__avatar" onClick={props.onEditAvatar} src={currentUser.avatar} alt="Жак-Ив Кусто" /></div>
                    <div className="profile__info">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <p className="profile__subtitle">{currentUser.about}</p>
                        <button type="button" id="button-edit-profile" className="button button_icon button_dark profile__button-edit" onClick={props.onEditProfile}></button>
                    </div>
                    <button type="button" id="button-add-place" className="button button_icon button_icon-add button_dark profile__button-add" onClick={props.onAddPlace}></button>
                </section>
                <section className="elements">
                    <ul className="elements__list">
                        {props.cards.map(card => (<Card key={card._id} card={card} onImagePopup={props.imagePopupClickHandler} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}
                            onConfirmationPopup={props.confirmationPopupClickHandler} />))}
                    </ul>
                </section>
            </main>
        </>
    )
}

export default Main