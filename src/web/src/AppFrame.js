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
      </div>
    `;

    return template;
  }
}

export default registerElement()(AppFrame);
