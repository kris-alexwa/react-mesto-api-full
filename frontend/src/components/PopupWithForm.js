import React from 'react';

function PopupWithForm(props) {
    const popupClass = `popup ${props.isOpen?  'popup_opened': ''}` 

    const [formValid, setFormValid] = React.useState(false);
    const formRef = React.useRef();

    function validate() {
        setFormValid(formRef.current.checkValidity())
    }

    function handleFormChange() {
        validate()
    }

    React.useEffect(() => {
        validate()
    }, [props.isOpen])

    return (
        <div className={popupClass}>
        <div className="popup__wrapper">
            <button type="button"  className="button button_icon button_icon-close button_transparent popup__close-button" onClick={props.onClose}></button>
            <div className="popup__container">
                <h2 className="popup__title">{props.title}</h2>
                <form onSubmit={props.onSubmit} name={props.name} ref={formRef} className="popup__form" onChange={handleFormChange} noValidate>
                    {props.children}
                    <button type="submit" disabled={!formValid} className="button button_dark popup__save-button">{props.submitText}</button>
                </form>
            </div>
        </div>
    </div>
    )
}

export default PopupWithForm