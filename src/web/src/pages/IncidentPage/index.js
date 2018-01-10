import { BaseElement, registerElement } from 'single-malt';

class IncidentPage extends BaseElement {

  get template() {
    const t = `
      <style>
      </style>
      <div>
        Incident Page
      </div>
    `;

    return t;
  }
}

export default registerElement()(IncidentPage);
