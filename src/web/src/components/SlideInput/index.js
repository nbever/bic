import { BaseElement, registerElement } from 'single-malt';
import template from './template';
import isNil from 'lodash/isNil';

class SlideInput extends BaseElement {

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

  get template() {
    return template;
  }

  get input() {
    if ( isNil(this._input) ) {
      this._input = this.shadowRoot.querySelector('input');
    }

    return this._input;
  }

  get undertow() {
    if ( isNil( this._undertow ) ) {
      this._undertow = this.shadowRoot.querySelector('.undertow');
    }

    return this._undertow;
  }

  get top() {
    if ( isNil( this._top ) ) {
      this._top = this.shadowRoot.querySelector('.top');
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

export default registerElement()(SlideInput);
