
function InfoTooltip(props) {
    let s = "popup"
    if (props.isOpen) {
        s = "popup popup_opened"
    }

    return (
        <div className={s} >
            <div className="popup__wrapper">
                <button className="button button_icon button_icon-close button_transparent popup__close-button popup__successful-close-btn" onClick={props.onClose}></button>
                <div className="popup__container">
                    <img className="popup__icon" src={props.icon} alt="Иконка обратной связи"></img>
                    <p className="popup__text">{props.text}</p>
                </div>
            </div>
        </div>

    )
}

export default InfoTooltip;