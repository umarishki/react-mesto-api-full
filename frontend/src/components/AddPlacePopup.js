import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ buttonTitle, onAddPlace, isOpen, onClose }) {
    const [formValues, setFormValues] = useState({ name: '', link: '' });

    const handleChange = (e) => {
      const {name, value} = e.target;
      setFormValues(prevState => ({ ...prevState, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace(formValues);
        clearPopup();
    }

    function clearPopup() {
        setFormValues({ name: '', link: '' });
    }

    return (
        <PopupWithForm
            name="add-card"
            title="Новое место"
            buttonTitle={buttonTitle}
            onSubmit={handleSubmit}
            isOpened={isOpen}
            onClose={onClose}
        >
            <input
                id="place-name-input"
                className="popup__input popup__input_field_place-name"
                value={formValues.name || ""}
                onChange={handleChange}
                type="text"
                name="name"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                required
            />
            <span className="place-name-input-error popup__error"></span>
            
            <input
                id="place-link-input"
                className="popup__input popup__input_field_link"
                value={formValues.link || ""}
                onChange={handleChange}
                type="url"
                name="link"
                placeholder="Ссылка на картинку"
                required
            />
            <span className="place-link-input-error popup__error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;