import TabBar from './components/TabBar';
import OverviewPage from './pages/OverviewPage';
import StudentPage from './pages/StudentPage';
import IncidentPage from './pages/IncidentPage';

import { Router, BaseElement, registerElement } from 'single-malt';

class MainTabs extends BaseElement {

  get template() {
    return `
      <style>
        a {
          color: white;
        }
      </style>
      <div>
        <tab-bar>
          <a data-url="/student">Student</a>
          <a data-url="/incident">Incident</a>
        </tab-bar>
        <wc-router>
          <wc-route persist path="/student" page="student-page"></wc-route>
          <wc-route persist path="/incident" page="incident-page"></wc-route>
        </wc-router>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.find('a').click();
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
  }
}

export default registerElement()(MainTabs);
