function PopupConfirmation(props) {
    const popupClass = `popup ${props.isOpen?  'popup_opened': ''}` 

    const submitBtnText = 'Да'
    const submitBtnTextLoading = "Удаление..."

    return (
        <div id="popup-delete-card" className={popupClass}>
        <div className="popup__wrapper popup__wrapper-delete-card">
            <button type="button" id="popup-close-button-delete-card" className="button button_icon button_icon-close button_transparent popup__close-button" onClick={props.onClose}></button>
            <div className="popup__container popup__container-delete-card">
                <h2 className="popup__title popup__title-delete-card">Вы уверены?</h2>
                <button id="button-delete-card" type="submit" className="button button_dark popup__save-button popup__delete-card-button" onClick={props.onConfirmation}>
                {props.isLoading ? submitBtnTextLoading : submitBtnText}
                </button>
            </div>
        </div>
    </div>
    )
}

export default PopupConfirmation