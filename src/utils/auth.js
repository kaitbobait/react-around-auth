
class AuthApi {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._authorize = headers.authorization;
    this._contentType = headers["Content-Type"];
  }

  register(username, password){
    return fetch(`${this._baseUrl}/auth/local/register`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': this._contentType
      },
      body: JSON.stringify({ username, password})
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err))
  };

  authorize(username, password) {
    return fetch(`${this._baseUrl}/auth/local/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': this._contentType
      },
      body: JSON.stringify({ username, password})
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err))
  }

};

const auth = new AuthApi({
  baseUrl: "https://register.nomoreparties.co",
  headers: {
    authorization: "",
    "Content-Type": "application/json"
  }
});

export default auth;