import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupConfirmation from './PopupConfirmation';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import * as userAuth from '../utils/userAuth';


function App() {

    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

    function addPlaceBtnClickHandler() {
        setIsAddPlacePopupOpen(true)
    }

    function addPlacePopupCloseClickHandler() {
        setIsAddPlacePopupOpen(false)
    }

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);

    function editProfileBtnClickHandler() {
        setIsEditProfilePopupOpen(true)
    }

    function editProfilePopupCloseClickHandler() {
        setIsEditProfilePopupOpen(false)
    }
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

    function avatarClickHandler() {
        setIsEditAvatarPopupOpen(true)
    }

    function avatarPopupCloseClickHandler() {
        setIsEditAvatarPopupOpen(false)
    }

    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
    const [imagePopupTitle, setImagePopupTitle] = React.useState('');
    const [imagePopupImage, setImagePopupImage] = React.useState('');

    function imagePopupClickHandler(title, linkImage) {
        setIsImagePopupOpen(true)
        setImagePopupTitle(title)
        setImagePopupImage(linkImage)
    }

    function imagePopupCloseClickHandler() {
        setIsImagePopupOpen(false)
    }

    const [isPopupConfirmationOpen, setIsPopupConfirmationOpen] = React.useState(false);
    const [popupConfirmationCard, setPopupConfirmationCard] = React.useState(null);
    const [cardDeleteLoading, setCardDeleteLoading] = React.useState(false);

    function popupConfirmationCloseClickHandler() {
        setIsPopupConfirmationOpen(false)
    }

    function handleCardDelete(card) {
        setIsPopupConfirmationOpen(true)
        setPopupConfirmationCard(card)
    }

    function handleDeleteCardConfirmation() {
        setCardDeleteLoading(true)
        api.deleteCard(popupConfirmationCard._id)
            .then(() => {
                setIsPopupConfirmationOpen(false)
                setPopupConfirmationCard(null)
                setCards((state) => state.filter((item) => item._id !== popupConfirmationCard._id))
                setCardDeleteLoading(false)
            })
            .catch(err => {
                alert('Не удалось удалить карточку');
                console.log(err);
                setCardDeleteLoading(false)
            })
    }

    const [currentUser, setCurrentUser] = React.useState({});

    React.useEffect(() => {
        api.getUserInfo()
            .then((res) => {
                setCurrentUser({ name: res.name, about: res.about, avatar: res.avatar, id: res._id })
            })
            .catch(err => {
                alert('Не удалось загрузить информацию о пользователе');
                console.log(err);
            })
    }, [])

    const [updateUserLoading, setUpdateUserLoading] = React.useState(false);
    const [createCardLoading, setCreateCardLoading] = React.useState(false);

    function handleUpdateUser(newUserInfo) {
        setUpdateUserLoading(true)
        api.editProfile(newUserInfo)
            .then((res) => {
                setCurrentUser({ name: res.name, about: res.about, avatar: res.avatar, id: res._id })
                setIsEditProfilePopupOpen(false)
                setUpdateUserLoading(false)
            })
            .catch(err => {
                alert('Не удалось обновить информацию о пользователе');
                console.log(err);
                setUpdateUserLoading(false)
            })
    }

    function handleUpdateAvatar(newUserInfo) {
        setUpdateUserLoading(true)
        api.updateUserAvatar(newUserInfo.avatar)
            .then((res) => {
                setCurrentUser({ name: res.name, about: res.about, avatar: res.avatar, id: res._id })
                setIsEditAvatarPopupOpen(false)
                setUpdateUserLoading(false)
            })
            .catch(err => {
                alert('Не удалось обновить аватар пользователя');
                console.log(err);
                setUpdateUserLoading(false)
            })
    }

    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getInitialCards()
            .then(res => setCards(res))
            .catch(err => {
                alert('Не удалось загрузить карточку');
                console.log(err);
            })
    }, [])

    function handleCardLike(card, isLiked) {
        if (isLiked) {
            api.deleteLikeCard(card._id)
                .then((newCard) => setCards((state) => state.map((c) => c._id === card._id ? newCard : c)))
                .catch(err => {
                    alert('Не удалось поставить лайк карточке');
                    console.log(err);
                })
        } else {
            api.likeCard(card._id)
                .then((newCard) => setCards((state) => state.map((c) => c._id === card._id ? newCard : c)))
                .catch(err => {
                    alert('Не удалось поставить лайк карточке');
                    console.log(err);
                })
        }
    }

    function handleAddPlaceSubmit(newCard) {
        setCreateCardLoading(true)
        api.saveNewCard(newCard)
            .then((res) => {
                setCards([res, ...cards])
                setIsAddPlacePopupOpen(false)
                setCreateCardLoading(false)
            })
            .catch(err => {
                alert('Не удалось добавить карточку');
                console.log(err);
                setCreateCardLoading(false)
            })
    }

    const [loggedIn, setLoggedIn] = React.useState(false);

    function handleLogin(email, password) {
        return userAuth.authorize(email, password).then(() => {
            history.push('/')
            setLoggedIn(true)
        })
    }

    function handleRegister(email, password) {
        return userAuth.register(email, password)
    }

    function handleCloseRegisterSuccessPopup() {
        history.push('/sign-in')
    }

    const [userData, setUserData] = React.useState({})

    const history = useHistory();

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            userAuth.getContent(token)
            .then((res) => {
                if (res) {
                    const newUserData = {
                         email: res.data.email
                    }
                    setLoggedIn(true)
                    setUserData(newUserData)
                    history.push('/')
                }
            })
            .catch(() => {
                localStorage.removeItem('token')
                setLoggedIn(false)
            })
        }
    }, [loggedIn])

    function signOut() {
        localStorage.removeItem('token');
        setLoggedIn(false)
        setUserData({})
        history.push('/sign-in')
    }


    return (
        <>
            <div className="page">
                <CurrentUserContext.Provider value={currentUser}>
                    <Switch>
                        <ProtectedRoute exact path="/" loggedIn={loggedIn} signOut={signOut} userData={userData} component={Main} imagePopupClickHandler={imagePopupClickHandler} onEditProfile={editProfileBtnClickHandler}
                            onAddPlace={addPlaceBtnClickHandler} onEditAvatar={avatarClickHandler} onCardDelete={handleCardDelete} userName={currentUser.name} userDescription={currentUser.about}
                            cards={cards} onCardLike={handleCardLike}
                        ></ProtectedRoute>
                        <Route path="/sign-up">
                            <Register onRegister={handleRegister} onCloseSuccessPopup={handleCloseRegisterSuccessPopup} />
                        </Route>
                        <Route path="/sign-in">
                            <Login onLogin={handleLogin}  />
                        </Route>
                        <Route>
                            {loggedIn ? <Redirect to="/sign-in" /> : <Redirect to="/sign-up" />}
                        </Route>
                    </Switch>
                </CurrentUserContext.Provider>
            </div>
            <Footer />

            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={editProfilePopupCloseClickHandler} onUpdateUser={handleUpdateUser} isLoading={updateUserLoading} />
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={avatarPopupCloseClickHandler} onUpdateAvatar={handleUpdateAvatar} isLoading={updateUserLoading} />
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={addPlacePopupCloseClickHandler} onUpdateCard={handleAddPlaceSubmit} isLoading={createCardLoading} />
            <PopupConfirmation isOpen={isPopupConfirmationOpen} onClose={popupConfirmationCloseClickHandler} onConfirmation={handleDeleteCardConfirmation} isLoading={cardDeleteLoading} />
            <ImagePopup isOpen={isImagePopupOpen} onClose={imagePopupCloseClickHandler} title={imagePopupTitle} image={imagePopupImage} />
        </>
    );
}

export default App;
