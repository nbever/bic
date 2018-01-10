import { BaseElement, registerElement } from 'single-malt';
import SlideButton from '../SlideButton';
import isNil from 'lodash/isNil';
import forEach from 'lodash/forEach';

class BicModal extends BaseElement {

  static OK_CANCEL = 0;
  static OK_ONLY = 1;
  static YES_NO = 2;

  get template() {
    const template = `
      <style>
        @import url('assets/fonts/bic-icons/bic-icons.css');

        div {
          font-family: {{ fontFamily }};
        }

        .modal {
          position: absolute;
          top: 0px;
          bottom: 0px;
          left: 0px;
          right: 0px;
          text-align: center;
          display: none;
        }

        .open {
          display: block;
        }

        .veil {
          width: 100%;
          height: 100%;
          z-index: 50;
          background-color: rgba(255, 255, 255, 0.6);
        }

        .content {
          top: 150px;
          z-index: 51;
          display: flex;
          justify-content: center;
          width: 100%;
          position: absolute;
        }

        .dialog-box {
          background-color: #efefef;
          border-radius: 8px;
          border: 1px solid #cccccc;
          position: relative;
          padding: 8px;
          min-width: 30%;
          max-width: 80%;
          box-shadow: 4px 4px 24px #cccccc;
        }

        .button-panel {
          display: flex;
          justify-content: center;
        }

        .title-bar {
          display: flex;
          border-bottom: 1px solid #cccccc;
          justify-content: space-between;
        }

        .title {
        }

        .close {
          font-size: 12px;
          cursor: pointer;
        }

        .close:hover {
          color: #555555;
        }

        .close:active {
          color: #aaaaaa;
        }

        #inner-content {
          margin-top: 12px;
          margin-bottom: 12px;
        }
      </style>
      <div class="modal">
        <div class="veil"></div>
        <div class="content">
          <div class="dialog-box">
            <div class="title-bar">
              <div class="title">{{ title }}</div>
              <i class="bic-icon-cross close" tab-index="0"></i>
            </div>
            <div id="inner-content"></div>
            <div class="button-panel"></div>
          </div>
        </div>
      </div>
    `;

    return template;
  }

  setDefaults() {
    this._mode = BicModal.OK_CANCEL;
    this.fontFamily = this.StyleService.fontFamily;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  addEventListeners() {
    this.find('.close').addEventListener('click', this.cancelPressed);
    this.find('.close').addEventListener('keyup', this.cancelPressed);
  }

  removeEventListeners() {
    this.clearButtonListeners();

    this.find('.close').removeEventListener('click', this.cancelPressed);
    this.find('.close').removeEventListener('keyup', this.cancelPressed);
  }

  get mode() {
    return this._mode;
  }

  set mode(aMode) {
    this._mode = aMode;
    this.createButtons();
  }

  get title() {
    return this._title;
  }

  set title(aTitle) {
    this._title = aTitle;

    const myTitle = this.find('.title');

    if (!isNil(myTitle)) {
      myTitle.innerHTML = this._title;
    }
  }

  setContent = (content) => {
    this.find('#inner-content').innerHTML = content;
  }

  show = () => {
    this.addClass(this.find('.modal'), 'open');
  }

  close = () => {
    this.removeClass(this.find('.modal'), 'open');
  }

  createButtons = () => {
    const buttonPanel = this.find('.button-panel');

    while (buttonPanel.firstChild) {
      buttonPanel.removeChild(buttonPanel.firstChild);
    }

    if (this.mode === BicModal.OK_ONLY || this.mode === BicModal.OK_CANCEL) {
      this.buildButton('OK', buttonPanel, this.okPressed);
    }

    if (this.mode === BicModal.OK_CANCEL) {
      this.buildButton('Cancel', buttonPanel, this.cancelPressed);
    }

    if (this.mode === BicModal.YES_NO) {
      this.buildButton('Yes', buttonPanel, this.okPressed);
      this.buildButton('No', buttonPanel, this.cancelPressed);
    }
  }

  clearButtonListeners = () => {
    const buttons = this.findAll('slide-button');

    forEach(buttons, b => {
      b.removeEventListener('click', this.okPressed);
      b.removeEventListener('keyup', this.okPressed);
      b.removeEventListener('click', this.cancelPressed);
      b.removeEventListener('keyup', this.cancelPressed);
    });
  }

  buildButton = (text, panel, listener) => {
    const button = document.createElement('slide-button');
    button.appendChild(document.createTextNode(text));
    button.addEventListener('click', listener);
    button.addEventListener('keyup', listener);
    panel.appendChild(button);
  }

  okPressed = ($event) => {
    if ($event.type === 'keyup' && $event.keyCode !== 13) {
      return;
    }

    this.dispatchEvent(new CustomEvent('dialog-ok-pressed'));
  }

  cancelPressed = ($event) => {
    if ($event.type === 'keyup' && $event.keyCode !== 13) {
      return;
    }

    this.dispatchEvent(new CustomEvent('dialog-close'));
  }
}

export default registerElement('StyleService')(BicModal);
