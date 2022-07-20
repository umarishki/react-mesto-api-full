import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import editPencil from '../images/profile__edit-pencil.svg';
import addIcon from '../images/profile__add-icon.svg';
import Card from './Card';

function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardDeleteWithConfirmation, onCardClick, onCardLike, cards }) {
    const currentUser = useContext(CurrentUserContext);
    return (
            <main className="main">
                <section className="profile">
                    <button className="profile__edit-image" type="button" onClick={onEditAvatar}>
                        <img className="profile__image" src={currentUser.avatar} alt="Фото профиля" />
                    </button>
                    <div className="profile-info">
                        <h1 className="profile-info__title">{currentUser.name}</h1>
                        <button className="profile-info__edit-btn" type="button" onClick={onEditProfile}>
                            <img className="profile-info__edit-icon" src={editPencil} alt="Иконка: edit" />
                        </button>
                        <p className="profile-info__subtitle">{currentUser.about}</p>
                    </div>
                    <button className="profile__add-btn" type="button" onClick={onAddPlace}>
                        <img className="profile__add-icon" src={addIcon} alt="Иконка: add" />
                    </button>
                </section>

                <section className="cards">
                    <ul className="cards-container">
                        {cards && (cards.map((card, i) => (
                            <Card onCardDeleteWithConfirmation={onCardDeleteWithConfirmation} onCardClick={onCardClick} onCardLike={onCardLike} card={card} key={card._id} />
                        )))}
                    </ul>
                </section>
            </main>
    );
}

export default Main;