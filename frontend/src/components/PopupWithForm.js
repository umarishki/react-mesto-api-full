import closeIcon from '../images/popup__close.svg';

function PopupWithForm({ name, title, buttonTitle, onSubmit, isOpened, onClose, children }) {
    return (
        <div className={`popup popup_type_${name}${isOpened ? ' popup_opened' : ''}`}>
            <div className="popup__container">
                <button className="popup__close" onClick={onClose} type="button">
                    <img className="popup__image-close" src={closeIcon} alt="Иконка: close" />
                </button>
                <form className={`popup__form popup__form_type_${name}`} onSubmit={onSubmit} name={name} noValidate>
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button className="popup__button" type="submit">{buttonTitle}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;