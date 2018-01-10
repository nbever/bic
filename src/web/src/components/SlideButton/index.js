import { BaseElement, registerElement } from 'single-malt';

class SlideButton extends BaseElement {

  get template() {
    const t = `
      <style>
        .undertow {
          bottom-border: 4px solid {{ textColor }};
          width: 0px;
        }

        .undertow.on {
          width: 100%;
        }

        button {
          border: none;
          background-color: {{ accentColor }};
          border-radius: 2px;
          color: {{ textColor }};
          font-family: {{ fontFamily }};
          font-size: 16px;
          padding-top: 4px;
          outline: none;
          cursor: pointer;
          margin: 2px;
        }

        button:hover {
          background-color: {{ hoverColor }};
        }

        button:active {
          background-color: {{ activeColor }};
        }
      </style>
      <button>
        <slot></slot>
        <div class="undertow"></div>
      </button>
    `;

    return t;
  }

  setDefaults() {
    this._accentColor = this.StyleService.accentColor;
    this._textColor = 'white';
    this._hoverColor = this.StyleService.hoverColor;
    this._activeColor = this.StyleService.activeColor;
    this._fontFamily = this.StyleService.fontFamily;
  }

  get fontFamily() {
    return this._fontFamily;
  }

  set fontFamily(font) {
    this._fontFamily = font;
  }

  get textColor() {
    return this._textColor;
  }

  set textColor(aColor) {
    this._textColor = aColor;
  }

  get accentColor() {
    return this._accentColor;
  }

  set accentColor(aColor) {
    this._accentColor = aColor;
  }

  get activeColor() {
    return this._activeColor;
  }

  set activeColor(aColor) {
    this._activeColor = aColor;
  }

  get hoverColor() {
    return this._hoverColor;
  }

  set hoverColor(aColor) {
    this._hoverColor = aColor;
  }

  addEventListeners() {
    const button = this.find('button');
    button.addEventListener('click', this.pressed);
    button.addEventListener('keyup', this.pressed);
    button.addEventListener('focus', this.focused);
    button.addEventListener('blur', this.unfocused);
  }

  removeEventListeners() {
    const button = this.find('button');
    button.removeEventListener('click', this.pressed);
    button.removeEventListener('keyup', this.pressed);
    button.removeEventListener('focus', this.focused);
    button.removeEventListener('blur', this.unfocused);
  }

  pressed = ($event) => {

  }

  focused = () => {
    this.addClass(this.find('.undertow'), 'on');
  }

  unfocused = () => {
    this.removeClass(this.find('.undertow'), 'on');
  }
}

export default registerElement('StyleService')(SlideButton);
