class AuthApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._contentType = headers["Content-Type"];
  }

  //doesn't work
  register(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((res) => {
        console.log(res);
        // localStorage.setItem('token', data.token);
        return res;
      })
      .catch((err) => {
        console.log(err);
        //return res.status(400).send({error: 'one of the fields was filled in incorrectly '})
      });
  }

  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          return res;
        } else {
          console.log("token is coming up undefined");
          return;
        }
      })
      .catch((err) => {
        console.log(err);
        //need 400? How to check?
        //return res.status(401).send({error: 'the user with the specified email not found d'})
      });
  }

  getContent(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": this._contentType,
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then(({ data }) => data);
  }
}

const auth = new AuthApi({
  baseUrl: "https://register.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
});

export default auth;
