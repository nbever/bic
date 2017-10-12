import { BaseElement, registerElement } from 'single-malt';
import MainTabs from './MainTabs';

class AppFrame extends BaseElement {

  get template() {
    const template = `
      <style>
        div {
          width: 200px;
          height: 200px;
          background-color: #f0f0f0;
          color: #525252;
        }
      </style>
      <div>
        <main-tabs></main-tabs>
        <span class="content">
        </span>
      </div>
    `;

    return template;
  }
}

export default registerElement()(AppFrame);
