import template from './template';
import { BaseElement, registerElement } from 'single-malt';

class OverviewPage extends BaseElement {

  connectedCallback() {
    super.connectedCallback();
  }

  get template() {
    return template;
  }
}

export default registerElement()(OverviewPage);
