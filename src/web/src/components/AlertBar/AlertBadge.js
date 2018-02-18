import { BaseElement, registerElement } from 'single-malt';

class AlertBadge extends BaseElement {

  get template() {
    return `
      <style>
        @import url('/assets/fonts/bic-icons/bic-icons.css');

        .container {
          display: flex;
          padding-left: 12px;
          padding-right: 12px;
        }

        .icon {
          font-size: 36px;
          padding-right: 12px;
        }

        .text {
          text-decoration: underline;
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .value {
          display: flex;
          align-items: center;
          font-size: 28px;
          font-weight: bold;
          padding-right: 4px;
        }
      </style>
      <div class="container" style="color: {{color}}">
        <span class="icon {{icon}}"></span>
        <span class="value">{{value}}</span>
        <span class="text">{{description}}</span>
      </div>
    `;
  }
}

export default registerElement()(AlertBadge);
