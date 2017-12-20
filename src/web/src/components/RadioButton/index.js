import { BaseElement, registerElement } from 'single-malt';

class RadioButton extends BaseElement {

  get template() {
    const template = `
      <style>
        #radio-button {
          display: flex;
          position: relative;
          margin-bottom: 4px;
        }

        .button {
          width: 16px;
          height: 16px;
          border-radius: 10px;
          border: 1px solid {{textColor}};
          background-color: white;
          cursor: pointer;
        }

        .inner-button {
          margin: 2px;
          border-radius: 10px;
          width: 12px;
          height: 12px;
          background-color: {{accentColor}};
        }

        .focus {
          width: 100% !important;
        }

        .item-icon-div {

        }

        .item-icon {

        }

        .item-text {
          height: 18px;
          color: {{textColor}};
          padding-top: 1px;
          padding-left: 4px;
          position: relative;
        }

        .real-input {
          position: absolute;
          z-index: -1;
        }

        .underline {
          background-color: {{accentColor}};
          height: 4px;
          width: 0px;
          transition: 200ms;
        }
      </style>
      <div id="radio-button">
        <div class="button">
          <div class="inner-button" style="display: none">
          </div>
        </div>
        <div class="item-icon-div">
          <span class="item-icon"></span>
        </div>
        <div class="item-text">
          <div>{{text}}</div>
          <div class="underline"></div>
        </div>
        <input class="real-input" type="radio" value={{value}}></input>
      </div>
    `;

    return template;
  }

  constructor() {
    super();
  }

  setDefaults() {
    this._textColor = 'black';
    this._accentColor = 'blue';
    this._text = 'Placeholder';
    this._selected = false;
    this._value = null;
  }

  addEventListeners() {
    const button = this.find('.button');
    button.addEventListener('click', this.toggleSelection);
    const input = this.find('input');
    input.addEventListener('focus', this.showFocus);
    input.addEventListener('blur', this.focusLost);
    input.addEventListener('keyup', this.keyTyped);
  }

  removeEventListeners() {
    const button = this.find('.button');
    button.removeEventListener('click', this.toggleSelection);
    const input = this.find('input');
    input.removeEventListener('focus', this.showFocus);
    input.removeEventListener('blur', this.focusLost);
    input.removeEventListener('keyup', this.keyTyped);
  }

  toggleSelection = () => {
    this.find('input').focus();
    this.selected = !this.selected;
  }

  keyTyped = ($event) => {
    if ( $event.keyCode === 13 || $event.keyCode === 32 ) {
      this.toggleSelection();
    }
  }

  showFocus = () => {
    this.addClass(this.find('.underline'), 'focus');
  }

  focusLost = () => {
    this.removeClass(this.find('.underline'), 'focus');
  }

  get selected() {
    return this._selected;
  }

  set selected(isSelected) {
    this._selected = isSelected;

    const display = this._selected ? 'block' : 'none';
    const innerButton = this.find('.inner-button');
    innerButton.style.display = display;

    if (this._selected === true) {
      const event = new CustomEvent('bic-selected');

      this.dispatchEvent(event);
    }
  }

  get textColor() {
    return this._textColor;
  }

  set textColor(aColor) {
    this._textColor = aColor;
  }

  get text() {
    return this._text;
  }

  set text(someText) {
    this._text = someText;
  }

  get accentColor() {
    return this._accentColor;
  }

  set accentColor(aColor) {
    this._accentColor = aColor;
  }

  get value() {
    return this._value;
  }

  set value(aValue) {
    this._value = aValue;
  }

}

export default registerElement()(RadioButton);
