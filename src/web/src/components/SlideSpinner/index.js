import { BaseElement, registerElement } from 'single-malt';

import isNil from 'lodash/isNil';
import findIndex from 'lodash/findIndex';

class SlideSpinner extends BaseElement {

  get template() {
    const template = `
      <style>
        input {
          border: 0px;
          background-color: transparent;
          outline: none;
          padding: 8px;
          font-size: 18px;
          border-bottom: 1px solid lightgray;
          transition: 200ms;
          margin-top: 24px;
          flex-grow: 1;
          -webkit-appearance: textfield;
          width: 100%;
          color: {{ textColor }};
        }

        .input-focus {
          background-color: white;
          border-bottom: 0px;
          color: black;
        }

        .undertow {
          border-bottom: 4px solid {{ accentColor }};
          width: 0px;
          transition: 250ms;
        }

        .undertow.on {
          width: 100%;
        }

        .top {
          color: darkgray;
          position: absolute;
          top: 32px;
          left: 8px;
          font-size: 18px;
          pointer-events: none;
          transition: 200ms;
        }

        .top.on {
          top: 12px;
          font-size: 12px;
        }

        .slide-spinner {
          position: relative;
          text-align: left;
          width: {{ width }};
        }

        .input-section {
          width: 100%;
          display: flex;
        }

        .button-parent {
          flex-grow: 0;
          width: 30px;
          background-color: #e5e5e5;
          margin-top: 24px;
        }

        .button:hover {
          background-color: #F0F0F0;
        }

        .button {
          padding: 2px;
          padding-top: 8px;
          cursor: pointer;
          outline: none;
        }

        .up-triangle {
          border: 8px solid transparent;
          border-top: 0px;
          border-bottom: 8px solid {{ accentColor }};
        }

        .down-triangle {
          border: 8px solid transparent;
          border-bottom: 0px;
          border-top: 8px solid {{ accentColor }};
        }

        .off {
          display: none;
        }
      </style>
      <div class="slide-spinner">
        <div class="top">{{placeholder}}</div>
        <div style="position: relative;">
          <div class="input-section">
            <input />
            <div class="button-parent off">
              <div class="up button">
                <div class="up-triangle"></div>
              </div>
              <div class="down button">
                <div class="down-triangle"></div>
              </div>
            </div>
          </div>
          <div class="undertow"></div>
        </div>
      </div>
    `;

    return template;
  }

  get min() {
    return this._min;
  }

  set min(aNumber) {
    this._min = parseInt(aNumber);
  }

  get max() {
    return this._max;
  }

  set max(aNumber) {
    this._max = parseInt(aNumber);
    this.setWidth();
  }

  get value() {
    return this._value;
  }

  set value(aNumber) {
    this._value = parseInt(aNumber);
    this.input.value = this._value;
  }

  get input() {
    if ( isNil(this._input) ) {
      this._input = this.find( 'input' );
    }

    return this._input;
  }

  get undertow() {
    if ( isNil(this._undertow) ) {
      this._undertow = this.find('.undertow');
    }

    return this._undertow;
  }

  get top() {
    if ( isNil(this._top) ) {
      this._top = this.find('.top');
    }

    return this._top;
  }

  setDefaults() {
    this._step = 1;
    this._min = 0;
    this._max = 999999;
    this._value = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setWidth();
  }

  setWidth = () => {
    if (isNil(this.shadowRoot)) {
      return;
    }

    this.find('.slide-spinner').style.width = `${((this.max + '').length * 12) + 30}px`;
  }

  addEventListeners() {
    this.input.addEventListener('blur', this.fieldUnfocused);
    this.input.addEventListener('focus', this.fieldFocused);
    this.find('.up').addEventListener('click', this.increment);
    this.find('.down').addEventListener('click', this.increment);
    this.input.addEventListener('keydown', this.keyTyped);
  }

  removeEventListeners() {
    this.input.removeEventListener('blur', this.fieldUnfocused);
    this.input.removeEventListener('focus', this.fieldFocused);
    this.find('.up').removeEventListener('click', this.increment);
    this.find('.down').removeEventListener('click', this.increment);
    this.input.removeEventListener('keydown', this.keyTyped);
  }

  increment = ($event) => {

    if ( this.value + 1 > this.max ) {
      this.value = this.max;
      return;
    }

    this.value = this.value + 1;
  }

  decrement = ($event) => {

    if ( this.value - 1 < this.min ) {
      this.value = this.min;
      return;
    }

    this.value = this.value - 1;
  }

  keyTyped = ($event) => {

    if ( $event.keyCode === 9 ) {
      return;
    }

    if ( $event.keyCode !== 8 &&
      $event.keyCode !== 38 &&
      $event.keyCode !== 40 &&
      ($event.keyCode < 48 ||
      ($event.keyCode > 64 && $event.keyCode < 96) ||
      $event.keyCode > 105)) {
      $event.preventDefault();
      $event.stopPropagation();
      return;
    }

    if ( $event.keyCode === 38 ) {
      this.increment();
      return;
    }

    if ( $event.keyCode === 40 ) {
      this.decrement();
      return;
    }

    setTimeout( () => {
      const n = parseInt(this.input.value);

      if (isNaN(n)) {
        this.value = this.min;
      }
      else {
        this.value = parseInt(this.input.value);
      }
    }, 50);
    // this.value = parseInt(this.input.value + '' + $event.key);
  }

  fieldUnfocused = ($event) => {
    const us = this.findAll('*');

    const match = findIndex( us, (elem) => {
      return elem === $event.path[0];
    });

    if ( match !== -1 && $event.type === 'click') {
      return;
    }

    document.removeEventListener('click', this.fieldUnfocused);
    this.removeClass(this.undertow, 'on');
    this.removeClass(this.input, 'input-focus');
    this.addClass(this.find('.button-parent'), 'off');

    if ( this.input.value.trim() === '' ) {
      this.removeClass(this.top, 'on');
    }
  }

  fieldFocused = () => {
    this.addClass(this.undertow, 'on');
    this.addClass(this.input, 'input-focus');
    this.addClass(this.top, 'on');
    this.removeClass(this.find('.button-parent'), 'off');

    document.addEventListener('click', this.fieldUnfocused);
  }
}

export default registerElement()(SlideSpinner);
