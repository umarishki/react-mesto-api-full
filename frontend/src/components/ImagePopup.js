import closeIcon from '../images/popup__close.svg';

function ImagePopup({ card, onClose }) {
    return (
        <div className={"popup popup_type_card-preview" + (card ? " popup_opened" : "")}>
            <div className="popup__preview-container">
                <img className="popup__img-preview" src={card ? card.link : "#"} alt={card?.name} />
                <button className="popup__close popup__close_type_card-preview" onClick={onClose} type="button">
                    <img className="popup__image-close" src={closeIcon} alt="Иконка: close" />
                </button>
                <h2 className="popup__preview-title">{card?.name}</h2>
            </div>
        </div>
    );
}

export default ImagePopup;