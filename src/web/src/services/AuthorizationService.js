import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';

class AuthorizationService {

  constructor() {
    this._openMode = false;
  }

  login = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  logout = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  isOpenMode = () => {
    return fetch('/api/config/operating_mode',
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );
  }

  registerForChanges = (me) => {

    if (!isFunction(me.authChanged)) {
      throw new Error("An authorization listener must implement method 'authChanged(bool).'");
    }

    this.listeners.push(me);
  };

  unregister = (me) => {
    const index = this.listeners.find( (listener) => {
      return me === listener;
    });

    if ( index === -1 ) {
      return;
    }

    this.listeners.splice(index, 1);
  }

  get loggedin() {

    if ( isNil(this._isLoggedIn)) {
      this.isOpenMode().then( (response) => {
        return response.json();
      })
      .then( (json) => {
        if (json.mode === 'OPEN') {
          this._openMode = true;
          this._updateSigninStatus(true);
        }
        else {
          gapi.load('client:auth2', this._initClient);
        }
      });
    }

    return this._isLoggedIn;
  };

  get listeners() {

    if (isNil(this._listeners)) {
      this._listeners = [];
    }

    return this._listeners;
  }

  _initClient = () => {

    gapi.client.init({
        apiKey: 'tlpqYPNIm9Tp1A1WDdeEiSx2',
        // discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
        clientId: '0fr33eunhkaqekio6j3uct03bg4c1ut6.apps.googleusercontent.com',
        scope: 'profile'
    }).then( () => {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(this._updateSigninStatus);

      // Handle the initial sign-in state.
      this._updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  };

  _updateSigninStatus = (isSignedIn) => {
    // When signin status changes, this function is called.
    // If the signin status is changed to signedIn, we make an API call.
    this.listeners.forEach( (listener) => {
      if (isFunction(listener.authChanged)) {
        listener.authChanged(isSignedIn, this._openMode);
      }
    });

    this._isLoggedIn = isSignedIn;

    if (isSignedIn) {
      this._getToken();
    }
  }

  _getToken = () => {

    const auth = this._openMode ? '0123456789' : gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;

    fetch(`/api/login`, {
      method: 'post',
      body: JSON.stringify({ token: auth }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain'
      }
    }).then((resp) => {
      console.log(resp);
    });
  };
}

export default AuthorizationService;
