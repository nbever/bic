import { Router, BaseElement, registerElement } from 'single-malt';

import IncidentSearchPage from './IncidentSearchPage';
import IncidentView from './IncidentView';

class IncidentPage extends BaseElement {

  get template() {
    const t = `
      <wc-router>
        <wc-route path="/incident/view/:id" page="incident-view"></wc-route>
        <wc-route persist path="/incident" page="incident-search-page"></wc-route>
      </wc-router>
    `;

    return t;
  }
}

export default registerElement()(IncidentPage);
