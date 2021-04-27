
class AuthApi {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._contentType = headers["Content-Type"];
  }

  //doesn't work
  register(email, password){
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': this._contentType
      },
      body: JSON.stringify({ email, password})
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      //localStorage.setItem('jwt', data.jwt);
      return data;
    })
    .catch((err) => console.log(err))
  };

  authorize(email, password) {
    return fetch(`${this._baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': this._contentType
      },
      body: JSON.stringify({ email, password})
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

  getContent(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': this._contentType,
        'Authorization': `Bearer ${token}`
      }
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
    "Content-Type": "application/json"
  }
});

export default auth;