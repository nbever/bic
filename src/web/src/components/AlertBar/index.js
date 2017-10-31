import { BaseElement, registerElement } from 'single-malt';
import AlertBadge from './AlertBadge';

class AlertBar extends BaseElement {

  get template() {
    return `
      <style>
        .container {
          display: flex;
          padding: 8px;
          padding-left: 20px;
        }
      </style>
      <div class="container">
        <alert-badge color="red" icon="bic-icon-justice_scales" value="10" description="New discipline actions"></alert-badge>
        <alert-badge color="#159588" icon="bic-icon-gavel" value="6" description="Reviews needed"></alert-badge>
      </div>
    `;
  }

}

export default registerElement()(AlertBar);
