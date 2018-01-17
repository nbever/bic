import TabBar from './components/TabBar';
import OverviewPage from './pages/OverviewPage';
import IncidentPage from './pages/IncidentPage';

import { Router, BaseElement, registerElement } from 'single-malt';

class MainTabs extends BaseElement {

  get template() {
    return `
      <style>
        a {
          color: white;
          z-index: 1;
        }
      </style>
      <div>
        <tab-bar accent-color=${this.StyleService.accentColor}>
          <a id="overview-tab" data-url="/overview">Overview</a>
          <a data-url="/incident">Incident</a>
        </tab-bar>
        <wc-router>
          <wc-route persist path="/overview" page="overview-page"></wc-route>
          <wc-route persist path="/incident" page="incident-page"></wc-route>
        </wc-router>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    this.AuthorizationService.registerForChanges(this);
  }

  navigate($event) {
    const newUrl = $event.target.dataset.url;
    const event = new CustomEvent('urlchanged', {
      detail: {
        url: newUrl,
        replace: true,
      }
    });
    document.dispatchEvent(event);
  }

  addEventListeners() {
    const as = this.shadowRoot.querySelectorAll('tab-bar > a');
    as.forEach( a => {
      a.addEventListener('click', this.navigate);
    });
  }

  removeEventListeners() {
    const as = this.shadowRoot.querySelectorAll('tab-bar > a');
    as.forEach( a => {
      a.removeEventListener('click', this.navigate);
    });

    this.AuthorizationService.unregister(this);
  }

  userChanged = (user) => {
    if (user.role !== 'ADMIN' && user.role !== 'TEACHER') {
      const ot = this.find('#overview-tab');
      ot.parentElement.removeChild(ot);
    }
  }
}

export default registerElement('AuthorizationService', 'StyleService')(MainTabs);
