import PopupWithForm from './PopupWithForm';
import React from 'react';

function AddPlacePopup(props) {
    const [cardImage, setCardImage] = React.useState('');
    const [cardTitle, setCardTitle] = React.useState('');

    const [titleInputError, setTitleInputError] = React.useState(null)
    const [linkInputError, setLinkInputError] = React.useState(null)

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateCard({
            name: cardTitle,
            link: cardImage,
        });
    }

    function handleChangeCardImage(e) {
        setCardImage(e.target.value);
        setLinkInputError(e.target.validationMessage)
    }

    function handleChangeCardTitle(e) {
        setCardTitle(e.target.value);
        setTitleInputError(e.target.validationMessage)
    }

    React.useEffect(() => {
        setCardImage('')
        setCardTitle('')
    }, [props.isOpen])

    const submitBtnText = 'Добавить'
    const submitBtnTextLoading = "Добавление..."

    React.useEffect(() => {
        setTitleInputError(null)
        setLinkInputError(null)
    }, [props.isOpen])

    return (
        <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} name="new-place" title="Новое место" submitText={props.isLoading ? submitBtnTextLoading : submitBtnText}>
            <label className="popup__form-field">
                <input name="name" required type="text" className="popup__form-input" placeholder="Название" minLength="2" maxLength="30" value={cardTitle} onChange={handleChangeCardTitle} />
                <span className="popup__input-error popup__form-input_invalid">{titleInputError}</span>
            </label>
            <label className="popup__form-field">
                <input name="link" required type="url" className="popup__form-input" placeholder="Ссылка на картинку" value={cardImage} onChange={handleChangeCardImage} />
                <span className="popup__input-error popup__form-input_invalid">{linkInputError}</span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup