import { BaseElement, registerElement } from 'single-malt';

import isNil from 'lodash/isNil';

class SlideCheckbox extends BaseElement {

  get template() {
    const template = `
      <style>
        .checkbox {
          display: flex;
          position: relative;
        }

        input {
          visibility: hidden;
          position: absolute;
        }

        label {
          color: {{ textColor }};
        }

        .checked::before {
          content: "\\ea10";
          font-family: "bic-icons";
          color: {{ accentColor }};
          font-size: 22px;
          bottom: 2px;
          left: 0px;
          position: absolute;
        }

        .div-box {
          width: 14px;
          height: 14px;
          border: 1px solid {{ textColor }};
          background-color: white;
          border-radius: 2px;
          cursor: pointer;
          margin-right: 6px;
          margin-left: 2px;
          margin-top: 3px;
          outline: 0px none;
        }

        .focused {
          box-shadow: 0px 0px 4px 2px {{ accentColor }};
        }

        .underline {
          width: 0px;
          transition: 200ms;
          height: 4px;
          background-color: {{ accentColor }};
        }

        .underline-focus {
          width: 100%;
        }
      </style>
      <div class="checkbox">
        <input type="checkbox" id="checkbox">
        <div class="div-box" tabindex="0"></div>
        <div class="label-box">
          <label for="checkbox">
            <slot></slot>
          </label>
          <div class="underline"></div>
        </div>
      </div>
    `;

    return template;
  }

  setDefaults() {
    this._checked = false;
  }

  get checked() {
    return this._checked;
  }

  set checked(isChecked) {
    this._checked = isChecked;
    this.syncDisplay();
  }

  get label() {
    if ( isNil( this._label ) ) {
      this._label = this.find( 'label' );
    }

    return this._label;
  }

  get accentColor() {
    return this._accentColor;
  }

  set accentColor(aColor) {
    this._accentColor = aColor;
  }

  get checkbox() {
    if ( isNil( this._checkbox ) ) {
      this._checkbox = this.find( 'input' );
    }

    return this._checkbox;
  }

  get divCheckbox() {
    if ( isNil(this._divCheckbox) ) {
      this._divCheckbox = this.find('.div-box');
    }

    return this._divCheckbox;
  }

  addEventListeners() {
    this.label.addEventListener('click', this.toggleChecked );
    this.divCheckbox.addEventListener('click', this.toggleChecked );
    this.label.addEventListener('keyup', this.keyTyped );
    this.divCheckbox.addEventListener('keyup', this.keyTyped );
    this.divCheckbox.addEventListener('focus', this.focused );
    this.divCheckbox.addEventListener('blur', this.lostFocus );
  }

  removeEventListeners() {
    this.label.removeEventListener('click', this.toggleChecked );
    this.divCheckbox.removeEventListener('click', this.toggleChecked );
    this.label.removeEventListener('keyup', this.keyTyped );
    this.divCheckbox.removeEventListener('keyup', this.keyTyped );
    this.divCheckbox.removeEventListener('focus', this.focused );
    this.divCheckbox.removeEventListener('blur', this.lostFocus );
  }

  keyTyped = ($event) => {
    if ( $event.keyCode === 13 || $event.keyCode === 32 ) {
      this.toggleChecked();
    }
  }

  toggleChecked = () => {
    this.checked = !this.checked;
  }

  syncDisplay = () => {
    if ( this.checked === true ) {
      this.addClass( this.divCheckbox, 'checked' );
      this.checkbox.setAttribute( 'checked', true );
    }
    else {
      this.removeClass( this.divCheckbox, 'checked' );
      this.checkbox.removeAttribute( 'checked' );
    }
  }

  focused = () => {
    this.addClass( this.divCheckbox, 'focused' );
    this.addClass( this.find('.underline'), 'underline-focus' );
  }

  lostFocus = () => {
    this.removeClass( this.divCheckbox, 'focused' );
    this.removeClass( this.find('.underline'), 'underline-focus' );
  }
}

export default registerElement()(SlideCheckbox);
