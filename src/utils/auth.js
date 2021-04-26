
class AuthApi {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._authorize = headers.authorization;
    this._contentType = headers["Content-Type"];
  }

  //doesn't work
  register(username, password){
    return fetch(`${this._baseUrl}/register`, {
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
    return fetch(`${this._baseUrl}/login`, {
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
      if(data.user){
        localStorage.setItem('jwt', data.jwt);
        return data;
      } else {
        return
      }
      
    })
    .catch((err) => console.log(err))
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': this._contentType,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({})
    })
    .then((res) => {
      res.json();
    })
    .then((data)=> {
      return data;
    })
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