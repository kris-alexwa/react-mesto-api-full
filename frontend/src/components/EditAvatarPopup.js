import PopupWithForm from './PopupWithForm';
import React from 'react';

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();
    const [avatar, setAvatar] = React.useState('')

    const [linkInputError, setLinkInputError] = React.useState(null)

    function handleChangeAvatar(e) {
        setAvatar(e.target.value);
        setLinkInputError(e.target.validationMessage)
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    React.useEffect(() => setAvatar(''), [props.isOpen])

    const submitBtnText = 'Сохранить'
    const submitBtnTextLoading = "Сохранение..."

    React.useEffect(() => {
        setLinkInputError(null)
    }, [props.isOpen])

    return (
        <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} name="new-place" title="Обновить аватар" onSubmit={handleSubmit} submitText={props.isLoading ? submitBtnTextLoading : submitBtnText}>
            <label className="popup__form-field popup__form-field-update-avatar">
                <input name="link-avatar" id="link-avatar-input" required type="url" className="popup__form-input" placeholder="Ссылка" ref={avatarRef} value={avatar} onChange={handleChangeAvatar} />
                <span className="popup__input-error popup__form-input_invalid">{linkInputError}</span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup