import { BaseElement, registerElement } from 'single-malt';
import RadioButton from '../RadioButton';

import isNil from 'lodash/isNil';

class RadioButtonGroup extends BaseElement {

  get template() {
    const template = `
      <style>
      </style>
      <div class="radio-button-group">
        <slot></slot>
      </div>
    `;

    return template;
  }

  get radioButtons() {
    if ( isNil(this._radioButtons) ) {
      this._radioButtons = this.find('slot').assignedNodes().filter( (node) => {
        return node.localName === 'radio-button';
      });
    }

    return this._radioButtons;
  }

  addEventListeners() {
    this.radioButtons.forEach((radioButton) => {
      radioButton.addEventListener('bic-selected', this.buttonSelected);
    });
  }

  removeEventListeners() {
    this.radioButtons.forEach( (radioButton) => {
      radioButton.removeEventListener('bic-selected', this.buttonSelected);
    });
  }

  buttonSelected = ($event) => {
    this.radioButtons.filter( (button) => {
      return button !== $event.target;
    }).forEach( (offButton) => {
      offButton.selected = false;
    });
  };
}

export default registerElement()(RadioButtonGroup);
