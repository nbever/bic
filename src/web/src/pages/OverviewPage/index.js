import template from './template';
import { BaseElement, registerElement } from 'single-malt';

import SlideButton from '../../components/SlideButton';

class OverviewPage extends BaseElement {

  connectedCallback() {
    super.connectedCallback();
  }

  addEventListeners() {
    this.find('slide-button').addEventListener('click', this.showMyDialog);
  }

  removeEventListeners() {
    this.find('slide-button').removeEventListener('click', this.showMyDialog);
  }

  showMyDialog = () => {
    this.ModalService.showDialog('Fake Dialog', '<span>Hi Guys!</span>')
      .then( (result) => {
        alert(result);
      });
  }

  get template() {
    return template;
  }
}

export default registerElement('ModalService')(OverviewPage);
