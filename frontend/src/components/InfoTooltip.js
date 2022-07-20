import closeIcon from '../images/popup__close.svg';
import success from '../images/success.svg';
import fail from '../images/fail.svg';
import { useLocation } from 'react-router-dom';

function InfoTooltip({ isSuccessful, title, isOpen, onClose }) {

    return (
        <div className={`popup popup_type_info-tool-tip${isOpen && ' popup_opened'}`}>
        <div className="popup__container popup__container_type_info-tool-tip">
            <img className="popup__image-info" src={isSuccessful ? success : fail} alt={title} />
            <h2 className="popup__title popup__title_type_info-tool-tip">{title}</h2>
            <button className="popup__close popup__close_type_info-tool-tip" onClick={onClose} type="button">
                <img className="popup__image-close" src={closeIcon} alt="Иконка: close" />
            </button>
        </div>
        </div>
    )
}

export default InfoTooltip;