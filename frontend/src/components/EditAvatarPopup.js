import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ buttonTitle, onUpdateAvatar, isOpen, onClose }) {
    const link = useRef("#");

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: link.current.value,
        });
        clearPopup();
    }

    function clearPopup() {
        link.current.value = "";
    }

    return (
        <PopupWithForm
            name="edit-avatar"
            title="Обновить аватар"
            buttonTitle={buttonTitle}
            onSubmit={handleSubmit}
            isOpened={isOpen}
            onClose={onClose}
        >
            <input
                id="avatar-link-input"
                className="popup__input popup__input_field_link"
                ref={link}
                type="url"
                name="link"
                placeholder="Ссылка на аватар"
                required
            />
            <span className="avatar-link-input-error popup__error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;