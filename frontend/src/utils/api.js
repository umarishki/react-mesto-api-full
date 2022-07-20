export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _request(methodApi, urlApi, dataObj) {
        const token = this._getAuthToken();

        if (token) {
            this._headers['authorization'] = `Bearer ${token}`;
        }

        return fetch(`${this._baseUrl}${urlApi}`, {
            method: methodApi,
            headers: this._headers,
            body: dataObj ? JSON.stringify(dataObj) : undefined
        })
            .then(res => res.ok ? res.json() : Promise.reject({status: res.status, message: `Ошибка ${res.status}: ${res.statusText}`}))
            .then(res => res.data)
    }

    _getAuthToken() {
        return localStorage.getItem('token');
    }

    getInitialCards() {
        return this._request(
            'GET',
            'cards',
            undefined
        )
    }

    postNewCard(data) {
        return this._request(
            'POST',
            'cards',
            data
        );
    }

    deleteCard(cardID) {
        return this._request(
            'DELETE',
            `cards/${cardID}`,
            undefined
        );
    }

    putLike(cardId) {
        return this._request(
            'PUT',
            `cards/${cardId}/likes`,
            undefined
        );
    }

    deleteLike(cardId) {
        return this._request(
            'DELETE',
            `cards/${cardId}/likes`,
            undefined
        );
    }

    changeLikeCardStatus(cardId, isLiked) {
        return isLiked ? this.deleteLike(cardId) : this.putLike(cardId);
    }

    getProfileInfo() {
        return this._request(
            'GET',
            'users/me',
            undefined
        )
    }

    patchProfileInfo(data) {
        const { name, about } = data;
        return this._request(
            'PATCH',
            'users/me',
            {
                name: name,
                about: about
            }
        );
    }

    patchProfileAvatar({ avatar }) {
        return this._request(
            'PATCH',
            'users/me/avatar',
            {
                avatar: avatar,
            }
        );
    }

    postUser({ password, email }) {
        return this._request(
            'POST',
            'signup',
            {
                password: password,
                email: email
            }
        );
    }

    postUserAuth({ password, email }) {
        return this._request(
            'POST',
            'signin',
            {
                password: password,
                email: email 
            }
        );
    }
}

export const api = new Api({
    baseUrl: 'https://api.umarishki.mesto-front.nomoredomains.xyz/',
    headers: {
        'Content-Type': 'application/json'
    }
});

