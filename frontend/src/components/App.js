import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletionPopup from './ConfirmDeletionPopup';
import { initialButtonTitleValue } from '../utils/constants';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import Footer from './Footer';
import InfoTooltip from './InfoTooltip';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isConfirmDeletionPopupOpen, setIsConfirmDeletionPopupOpen] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedCardToDelete, setSelectedCardToDelete] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [buttonTitle, setButtonTitle] = useState(initialButtonTitleValue);
    const [message, setMessage] = useState('');


    const [isLoading, setIsLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isOperationSuccessful, setIsOperationSuccessful] = useState(false);
    const [userData, setUserData] = useState({});

    const history = useHistory();

    useEffect(() => {
        tokenCheck();
    }, []);

    useEffect(() => {
        if (loggedIn) {
            history.push("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedIn]);

    useEffect(() => {
        if (loggedIn) {
            Promise.all([api.getProfileInfo(), api.getInitialCards()])
                .then(([userData, cards]) => {
                    setCurrentUser(userData);
                    setCards(cards);
                })
                .catch((err) => {
                    handleBadTokenLogOut(err);
                });
        }
    }, [loggedIn]);

    function handleUpdateUser(data) {
        setButtonTitle('Сохранение...');
        api.patchProfileInfo(data)
            .then((userInfo) => {
                setCurrentUser(userInfo);
            })
            .catch((err) => {
                handleBadTokenLogOut(err);
            })
            .finally(() => {
                setButtonTitle(initialButtonTitleValue);
                closeAllPopups();
            });
    }

    function handleUpdateAvatar(data) {
        setButtonTitle('Сохранение...');
        api.patchProfileAvatar(data)
            .then((userInfo) => {
                setCurrentUser(userInfo);
            })
            .catch((err) => {
                handleBadTokenLogOut(err)
            })
            .finally(() => {
                setButtonTitle(initialButtonTitleValue);
                closeAllPopups();
            });
    }

    function handleAddPlaceSubmit(data) {
        setButtonTitle('Сохранение...');
        api.postNewCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
            })
            .catch((err) => {
                handleBadTokenLogOut(err)
            })
            .finally(() => {
                setButtonTitle(initialButtonTitleValue);
                closeAllPopups();
            });
    }

    function handleCardDelete(card) {
        setButtonTitle('Сохранение...');
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
            })
            .catch((err) => {
                handleBadTokenLogOut(err)
            })
            .finally(() => {
                setButtonTitle(initialButtonTitleValue);
                closeAllPopups();
            });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);

        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                handleBadTokenLogOut(err)
            });
    }

    const handleCardClick = (card) => {
        setSelectedCard(card);
    }

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    }

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    }

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    }

    const handleDeleteCard = (card) => {
        setIsConfirmDeletionPopupOpen(true);
        setSelectedCardToDelete(card);
    }

    const handleInfoTooltipOpen = () => {
        setIsInfoTooltipOpen(true);
    }

    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsConfirmDeletionPopupOpen(false);
        setIsInfoTooltipOpen(false);
        setSelectedCard(null);
    }

    const tokenCheck = () => {
        if (localStorage.getItem('token')) {
            api.getProfileInfo()
                .then((res) => {
                    if (res) {
                        let userData = {
                            id: res._id,
                            email: res.email
                        }
                        setUserData(userData);
                        setLoggedIn(true);
                        setIsLoading(false);
                    }
                })
                .catch((err) => {
                    handleBadTokenLogOut(err)
                });
        }
        else {
            setIsLoading(false);
        }
    }

    const handleLogin = ({ password, email }) => {
        return api.postUserAuth({ password, email })
            .then((res) => {
                if (res) {
                    localStorage.setItem('token', res);
                    setIsLoading(true);
                    tokenCheck();
                }
            })
            .catch((err) => {
                console.log(err.message);
                setIsOperationSuccessful(false);
                setMessage('Что-то пошло не так! Попробуйте ещё раз.');
                handleInfoTooltipOpen();
            });;
    }

    const handleRegister = ({ password, email }) => {
        return api.postUser({ password, email })
            .then((res) => {
                if (res) {
                    setIsOperationSuccessful(true);
                    setMessage('Вы успешно зарегистрировались!');
                    handleInfoTooltipOpen();
                    history.push('/sign-in');
                }
            })
            .catch((err) => {
                console.log(err.message);
                setIsOperationSuccessful(false);
                setMessage('Что-то пошло не так! Попробуйте ещё раз.');
                handleInfoTooltipOpen();
            });;
    }

    const handleBadTokenLogOut = (err) => {
        console.log(err.message);
        if (err.status === 401) {
            handleLogOut();
        }
    }

    const handleLogOut = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
        setUserData(null);
        history.push('/sign-in');
    }

    if (isLoading) {
        return <></>
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header email={userData ? userData.email : ''} handleLogOut={handleLogOut} />
            <Switch>
                <ProtectedRoute exact path='/' loggedIn={loggedIn} >
                    <Main
                        onEditProfile={handleEditProfileClick}
                        onEditAvatar={handleEditAvatarClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardDeleteWithConfirmation={handleDeleteCard}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        cards={cards}
                    />
                </ProtectedRoute>
                <Route path="/sign-in">
                    <Login handleLogin={handleLogin} />
                </Route>
                <Route path="/sign-up">
                    <Register handleRegister={handleRegister} />
                </Route>
                <Route path="*">
                    {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
                </Route>
            </Switch>
            <Footer />
            <InfoTooltip isSuccessful={isOperationSuccessful} title={message} isOpen={isInfoTooltipOpen} onClose={closeAllPopups} />
            <EditProfilePopup
                buttonTitle={buttonTitle}
                onUpdateUser={handleUpdateUser}
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
            />
            <EditAvatarPopup
                buttonTitle={buttonTitle}
                onUpdateAvatar={handleUpdateAvatar}
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
            />
            <AddPlacePopup
                buttonTitle={buttonTitle}
                onAddPlace={handleAddPlaceSubmit}
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
            />
            <ConfirmDeletionPopup
                buttonTitle={buttonTitle}
                card={selectedCardToDelete}
                onDeleteCard={handleCardDelete}
                isOpen={isConfirmDeletionPopupOpen}
                onClose={closeAllPopups}
            />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
    );
}

export default App;