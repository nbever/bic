import { BaseElement, registerElement } from 'single-malt';

import isNil from 'lodash/isNil';

class SlideTextArea extends BaseElement {

  get template() {
    const t = `
      <style>
        textarea {
          border: 0px;
          background-color: transparent;
          outline: none;
          padding: 8px;
          font-size: 18px;
          border-bottom: 1px solid lightgray;
          transition: 200ms;
          margin-top: 24px;
          width: calc(100% - 16px);
        }

        textarea:focus {
          background-color: white;
          border-bottom: 0px;
        }

        .undertow {
          border-bottom: 4px solid {{accentColor}};
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
      </style>
      <div style="position: relative;text-align: left;display: flex;">
        <div class="top">{{placeholder}}</div>
        <div style="position: relative;width: {{width}}">
          <textarea></textarea>
          <div class="undertow"></div>
        </div>
      </div>
    `

    return t;
  }

  fieldUnfocused = () => {
    this.removeClass(this.undertow, 'on');

    if ( this.input.value.trim() === '' ) {
      this.removeClass(this.top, 'on');
    }
  }

  fieldFocused = () => {
    this.addClass(this.undertow, 'on');
    this.addClass(this.top, 'on');
  }

  addEventListeners() {
    this.input.addEventListener('blur', this.fieldUnfocused);
    this.input.addEventListener('focus', this.fieldFocused);
  }

  removeEventListeners() {
    this.input.removeEventListener('blur', this.fieldUnfocused);
    this.input.removeEventListener('focus', this.fieldFocused);
  }

  get input() {
    if ( isNil(this._input) ) {
      this._input = this.find('textarea');
    }

    return this._input;
  }

  get undertow() {
    if ( isNil( this._undertow ) ) {
      this._undertow = this.find('.undertow');
    }

    return this._undertow;
  }

  get top() {
    if ( isNil( this._top ) ) {
      this._top = this.find('.top');
    }

    return this._top;
  }

  get value() {
    return this.input.value;
  }

  set value(value) {
    this.input.value = value;
    this.fieldFocused();
    this.fieldUnfocused();
  }

  get accentColor() {
    return this._accentColor;
  }

  set accentColor(color) {
    this._accentColor = color;
  }
}

export default registerElement()(SlideTextArea);
