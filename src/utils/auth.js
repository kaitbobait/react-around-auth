
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
      localStorage.setItem('jwt', data.token);
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
    //   //console.log(res); //unauthorized..no token?
    //   //console.log(localStorage); // undefined
      return res.json();
    })
    .then((data) => {
      console.log(data); //undefined
      //console.log(data.user); //undefined
      if(data){
        //console.log(localStorage); //jwt undefined
        localStorage.setItem('jwt', data.token);
        console.log(localStorage);
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