import Header from './Header';
import { Link } from 'react-router-dom';
import React from 'react';
import InfoTooltip from './InfoTooltip';
import successIcon from '../images/icons/success-icon.svg';
import failIcon from '../images/icons/fail-icon.svg';

function Register(props) {
    const [popupOpened, setPopupOpened] = React.useState(false);
    const [authOk, setAuthOk] = React.useState(false);

    const [userData, setUserData] = React.useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onRegister(userData.email, userData.password)
            .then(() => {
                    setAuthOk(true)
                    setPopupOpened(true)
            })
            .catch(() => {
                setAuthOk(false)
                setPopupOpened(true)
            })
    }

    function popupCloseClickHandler() {
        setPopupOpened(false)
        if (authOk) {
            props.onCloseSuccessPopup()
        }
    }

    const popupIcon = authOk ? successIcon : failIcon;
    const popupText = authOk ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'

    return (
        <>
            <InfoTooltip icon={popupIcon} text={popupText} isOpen={popupOpened} onClose={popupCloseClickHandler} />
            <Header classHeader="header">
                <Link to="/sign-in" className="header__link">Войти</Link>
            </Header>
            <div className="auth">
                <h1 className="auth__title">Регистрация</h1>
                <form onSubmit={handleSubmit} className="auth__form">
                    <input name="email" value={userData.email} onChange={handleChange} className="auth__input" placeholder="Email"></input>
                    <input type="password" name="password" value={userData.password} onChange={handleChange} className="auth__input" placeholder="Пароль"></input>
                    <button className="auth__btn">Зарегистрироваться</button>
                    <div className="auth__wrapper">
                        <p className="auth__secondary-text">Уже зарегистрированы?</p>
                    &ensp;
                    <Link to="/sign-in" className="auth__secondary-link">Войти</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register