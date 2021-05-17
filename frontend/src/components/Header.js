import logoHeader from '../images/logo/logo-header.svg';
import React from 'react';


function Header(props) {

    return (
        <>
        <header className={props.classHeader}>
            <img className="header__logo" src={logoHeader} alt="Логотип Место" />
            {props.children}
        </header>
        </>
    )
}

export default Header