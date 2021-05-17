import PopupWithForm from './PopupWithForm';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    const [nameInputError, setNameInputError] = React.useState(null)
    const [aboutInputError, setAboutInputError] = React.useState(null)

    const submitBtnText = 'Сохранить'
    const submitBtnTextLoading = "Сохранение..."

    React.useEffect(() => {     
        setName(currentUser?.name ?? '');
        setDescription(currentUser?.about ?? '')
    }, [currentUser, props.isOpen]);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name: name,
            about: description,
        });
    }

    function handleChangeName(e) {
        setName(e.target.value);
        setNameInputError(e.target.validationMessage)
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
        setAboutInputError(e.target.validationMessage)
    }

    React.useEffect(() => {
        setNameInputError(null)
        setAboutInputError(null)
    }, [props.isOpen])

    return (
        <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} name="new-place" title="Редактировать профиль" onSubmit={handleSubmit} submitText={props.isLoading ? submitBtnTextLoading : submitBtnText}>
            <label className="popup__form-field">
                <input name="name" required type="text" className="popup__form-input" placeholder="Имя" minLength="2" maxLength="40" value={name} onChange={handleChangeName} />
                <span className="popup__input-error popup__form-input_invalid">{nameInputError}</span>
            </label>
            <label className="popup__form-field">
                <input name="job" required type="text" className="popup__form-input" placeholder="О себе" minLength="2" maxLength="200" value={description} onChange={handleChangeDescription} />
                <span className="popup__input-error popup__form-input_invalid">{aboutInputError}</span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup