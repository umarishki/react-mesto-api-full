import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ onCardDeleteWithConfirmation, onCardClick, onCardLike, card }) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = (`cards__like-icon ${isLiked && 'cards__like-icon_active'}`);

    const handleDeleteClick = () => {
        onCardDeleteWithConfirmation(card);
    }

    const handleLikeClick = () => {
        onCardLike(card);
    }

    const handleClick = () => {
        onCardClick(card);
    }

    return (
        <li className="cards__item">
            <img className="cards__image" src={card.link} alt={`Фото: ${card.name}`} onClick={handleClick} />
            {isOwn && <button className="cards__delete-icon" type="button" onClick={handleDeleteClick}></button>}
            <div className="cards__footer">
                <h2 className="cards__title">{card.name}</h2>
                <div>
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
                    <p className="cards__likes-number">{card.likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;