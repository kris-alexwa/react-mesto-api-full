import Header from './Header';
import { Link } from 'react-router-dom';
import React from 'react';
import failIcon from '../images/icons/fail-icon.svg';
import InfoTooltip from './InfoTooltip';

function Login(props) {
    const [userData, setUserData] = React.useState({
        email: '',
        password: ''
    })
    const [popupOpened, setPopupOpened] = React.useState(false);
    const [loginError, setLoginError] = React.useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userData.email || !userData.password) {
            return;
        }
        props.onLogin(userData.email, userData.password)
            .catch((err) => {
                setPopupOpened(true)
                setLoginError(err)
            })
    }

    function popupCloseClickHandler() {
        setPopupOpened(false)
    }

    return (
        <>
            <InfoTooltip icon={failIcon} text={'Не удалось выполнить вход. ' + loginError} isOpen={popupOpened} onClose={popupCloseClickHandler} />
            <Header classHeader="header">
                <Link to="/sign-up" className="header__link">Регистрация</Link>
            </Header>
            <div className="auth">
                <h1 className="auth__title">Вход</h1>
                <form onSubmit={handleSubmit} className="auth__form">
                    <input type="email" name="email" value={userData.email} onChange={handleChange} className="auth__input" placeholder="Email"></input>
                    <input type="password" name="password" value={userData.password} onChange={handleChange} className="auth__input" placeholder="Пароль"></input>
                    <button className="auth__btn">Войти</button>
                </form>
            </div>
        </>
    )
}

export default Login;