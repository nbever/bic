import { BaseElement, registerElement } from 'single-malt';
import MainTabs from './MainTabs';
import AlertBar from './components/AlertBar';

class AppFrame extends BaseElement {

  get template() {
    const template = `
      <style>
        div {
          color: #525252;
          font-family: "optimusprincepsregular";
        }

        .app {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
        }

        .header {
          position: relative;
          height: 64px;
          background-color: black;
        }

        .logo {
          background-image: url('assets/sandpoinths.jpg');
          height: 64px;
          width: 64px;
          background-size: contain;
          float: left;
        }

        .top-container {
          display: flex;
          justify-content: space-between;
          padding-left: 21px;
          padding-top: 8px;
        }

        .title {
          font-size: 40px;
          color: white;
        }

        .login {
          width: 80px;
          height: 100%;
        }
      </style>
      <div class="app">
        <div class="header">
          <div class="logo"></div>
          <div class="top-container">
            <div class="title">Sandpoint BIC</div>
            <div class="login">
              <div>Nate</div>
            </div>
          </div>
        </div>
        <alert-bar></alert-bar>
        <main-tabs></main-tabs>
        <span class="content">
        </span>
        <button>Sign in with Google</button>
      </div>
    `;

    return template;
  }

  addEventListeners() {
    const button = this.shadowRoot.querySelector('button');
    button.addEventListener('click', this.login);
  }

  removeEventListeners() {
    const button = this.shadowRoot.querySelector('button');
    button.removeEventListener('click', this.login);
  }

  connectedCallback() {
    super.connectedCallback();
    gapi.load('client:auth2', this.initClient);
  }

  initClient = () => {
    gapi.client.init({
        apiKey: 'tlpqYPNIm9Tp1A1WDdeEiSx2',
        // discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
        clientId: '0fr33eunhkaqekio6j3uct03bg4c1ut6.apps.googleusercontent.com',
        scope: 'profile'
    }).then( () => {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

      // Handle the initial sign-in state.
      this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  };

  updateSigninStatus = (isSignedIn, a, b) => {
    // When signin status changes, this function is called.
    // If the signin status is changed to signedIn, we make an API call.
    if (isSignedIn) {
      const auth = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
      fetch(`/api/login/${auth}`).then((resp) => {
        alert(resp);
      });
    }
  }

  login = () => {
    gapi.auth2.getAuthInstance().signIn();
  };
}

export default registerElement()(AppFrame);
