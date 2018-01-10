import template from './template';

import { BaseElement, registerElement } from 'single-malt';

class StudentPage extends BaseElement {
  get template() {
    return template;
  }

  buttonClicked = () => {
    const scotch = this.BeverageService.pickAScotch();
    alert( `Scotch choice: ${scotch}` );
  }

  addEventListeners() {
    const myButton = this.shadowRoot.querySelector('button');
    myButton.addEventListener('click', this.buttonClicked);
  }

  removeEventListeners() {
    const myButton = this.shadowRoot.querySelector('button');
    myButton.removeEventListener('click', this.buttonClicked);
  }
}

export default registerElement()(StudentPage);
