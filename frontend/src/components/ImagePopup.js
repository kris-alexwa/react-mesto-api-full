function ImagePopup(props) {
    let s = "popup"
    if (props.isOpen) {
        s = "popup popup_opened"
    }

    return(
        <div className={s}>
        <div className="popup__picture-wrapper popup__container-propagation">
            <button type="button" id="popup-close-button-picture" className="button button_icon button_icon-close button_transparent popup__close-button" onClick={props.onClose}></button>
            <img className="popup__picture-image" src={props.image} alt={props.title}/>
            <h2 className="popup__picture-title">{props.title}</h2>
        </div>
    </div>
    )
}

export default ImagePopup