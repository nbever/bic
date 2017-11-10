import { BaseElement, registerElement } from 'single-malt';
import MainTabs from './MainTabs';
import AlertBar from './components/AlertBar';
import isNil from 'lodash/isNil';

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

        .logout {
          color: white;
          cursor: pointer;
        }

        .logged-out {
          background-color: black;
          height: 100%;
          width: 100%;
          text-align: center;
          padding-top: 100px;
        }

        .logo{
          background-image: url('assets/sandpoinths.jpg');
          background-size: contain;
        }

        .logo.logged-in {
          float: left;
          height: 64px;
          width: 64px;
        }

        .logged-out .logo{
          margin: auto;
          height: 128px;
          width: 128px;
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

        .hide {
          display: none;
        }

        .google-text-block {
          font-family: 'Roboto', sans-serif;
        }

        .login-button {
            padding-right: 8px;
            border-radius: 2px;
            background-color: white;
            display: flex;
            align-items: center;
            cursor: pointer;
        }

        .button-container {
          display: flex;
          justify-content: center;
        }

        .google-icon {
          text-indent: -9999px;
          width: 32px;
          height: 32px;
          background-image: url('assets/btn_google_light_normal_ios.svg');
          background-size: 32px 32px;
          padding-right: 6px;
          background-repeat: no-repeat;
        }
      </style>
      <div class="app">
        <div class="header hide">
          <div class="logo logged-in"></div>
          <div class="top-container">
            <div class="title">Sandpoint BIC</div>
            <div class="login">
              <div>Nate</div>
              <a class="logout">Logout</a>
            </div>
          </div>
        </div>
        <div class="logged-out">
          <div class="logo"></div>
          <div class="title">Sandpoint BIC</div>
          <div class="button-container">
            <div class="login-button">
              <div class="google-icon"></div>
              <div class="google-text-block">Sign in with Google</div>
            </div>
          </div>
        </div>
        <div class="main-content hide">
          <alert-bar></alert-bar>
          <main-tabs></main-tabs>
          <span class="content">
          </span>
        </div>
      </div>
    `;

    return template;
  }

  connectedCallback() {
    super.connectedCallback();
    this.AuthorizationService.registerForChanges(this);

    this.AuthorizationService.loggedin;
  }

  addEventListeners() {
    const loginButton = this.shadowRoot.querySelector('.login-button');
    const logout = this.shadowRoot.querySelector('.logout');
    loginButton.addEventListener('click', this.AuthorizationService.login);
    logout.addEventListener('click', this.AuthorizationService.logout);
  }

  removeEventListeners() {
    const loginButton = this.shadowRoot.querySelector('.login-button');
    const logout = this.shadowRoot.querySelector('.logout');
    loginButton.removeEventListener('click', this.AuthorizationService.login);
    logout.removeEventListener('click', this.AuthorizationService.logout);
  }

  authChanged = (loggedin) => {
    if (loggedin === true) {
      this.showApp();
    }
    else {
      this.hideApp();
    }
  };

  get header() {
    if ( isNil(this._header) ) {
      this._header = this.shadowRoot.querySelector('.header');
    }

    return this._header;
  }

  get loggedOut() {
    if (isNil(this._loggedout)) {
      this._loggedout = this.shadowRoot.querySelector('.logged-out');
    }

    return this._loggedout;
  }

  get mainContent() {
    if ( isNil(this._mainContent)) {
      this._mainContent = this.shadowRoot.querySelector('.main-content');
    }

    return this._mainContent;
  }

  showApp = () => {
    this.removeClass( this.mainContent, 'hide' );
    this.removeClass( this.header, 'hide' );

    this.addClass( this.loggedOut, 'hide' );
  };

  hideApp = () => {
    this.removeClass( this.loggedOut, 'hide' );

    this.addClass( this.mainContent, 'hide' );
    this.addClass( this.header, 'hide' );
  };
}

export default registerElement('AuthorizationService')(AppFrame);
