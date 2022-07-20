import { useState } from 'react';

function Form({ title, buttonTitle, handleSubmitForm }) {

    const [formValues, setFormValues] = useState({ password: '', email: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevState => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = (e) => {
        handleSubmitForm(e, formValues, setFormValues);
    }

    return (
        <form className="site-form" onSubmit={handleSubmit}>
            <h2 className="site-form__title">{title}</h2>
            <input
                id="site-form-email-input"
                className="site-form__input site-form__input_field_email"
                value={formValues.email || ''}
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="Email"
                required
            />
            <span className="site-form-input-error site-form__error"></span>
            <input
                id="site-form-password-input"
                className="site-form__input site-form__input_field_password"
                value={formValues.password || ''}
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="Пароль"
                minLength="6"
                maxLength="30"
                required
            />
            <span className="site-form-password-input-error site-form__error"></span>
            <button className="site-form__button" type="submit">{buttonTitle}</button>
        </form>
    )
}

export default Form;