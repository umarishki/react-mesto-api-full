import React, { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ buttonTitle, onUpdateUser, isOpen, onClose }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSetName(e) {
        setName(e.target.value);
    }

    function handleSetDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name="edit-profile"
            title="Редактировать профиль"
            buttonTitle={buttonTitle}
            onSubmit={handleSubmit}
            isOpened={isOpen}
            onClose={onClose}
        >
            <input
                id="profile-name-input"
                className="popup__input popup__input_field_name"
                value={name || ''}
                onChange={handleSetName}
                type="text"
                name="name"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                required
            />
            <span className="profile-name-input-error popup__error"></span>
            
            <input
                id="profile-occupation-input"
                className="popup__input popup__input_field_occupation"
                value={description || ''}
                onChange={handleSetDescription}
                type="text"
                name="occupation"
                placeholder="Род занятий"
                minLength="2"
                maxLength="200"
                required
            />
            <span className="profile-occupation-input-error popup__error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;