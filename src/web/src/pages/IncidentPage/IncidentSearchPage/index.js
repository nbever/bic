import { Router, BaseElement, registerElement } from 'single-malt';

import SlideCheckbox from '../../../components/SlideCheckbox';
import RadioButtonGroup from '../../../components/RadioButtonGroup';
import RadioButton from '../../../components/RadioButton';
import CannedDateRange from '../../../components/CannedDateRange';
import SlideTable from '../../../components/SlideTable';
import SlideTableHeader from '../../../components/SlideTable/SlideTableHeader';

import IncidentSearch from './IncidentSearch';

import moment from 'moment';

class IncidentSearchPage extends BaseElement {

  get template() {
    const t = `
      <style>
        #incident-page {
          position: absolute;
          top: 0px;
          bottom: 0px;
          left: 0px;
          right: 0px;
          padding-top: 38px;
        }

        .flex {
          display: flex;
        }

        .search-label {
          padding-right: 8px;
        }

        .top-panel {
          margin: 24px;
          position: relative;
        }

        .title-bar {
          background-color: ${this.StyleService.accentColor};
          color: white;
          padding: 12px;
          display: flex;
          justify-content: space-between;
          position: relative;
        }

        .date-select {
          margin-top: 8px;
        }

        .rotate {
          width: 130px;
          transform: rotate(90deg);
          position: absolute;
          left: -50px;
          top: 102px;;
        }

        .bic-icon-circle-right {
          position: relative;
          right: 6px;
        }

        .hide {
          display: none;
        }

        .invisible {
          visibility: hidden;
        }

        .between {
          justify-content: space-between;
        }

        .advanced-search {

        }

        .full-page {
          height: 100%;
        }

        .table-container {
          padding-top: 12px;
        }
      </style>
      <div id="incident-page">

        <div class="flex full-page">
          <div class="advanced-search">
            <incident-search></incident-search>
          </div>

          <div class="top-panel">
            <div class="search-type flex">
              <div class="search-label">Search Type:</div>
              <radio-button-group layout=${RadioButtonGroup.HORIZONTAL}>
                <radio-button id="incident-radio" text="Incident" value="incident" accent-color=${this.StyleService.accentColor}></radio-button>
                <radio-button id="student-radio" text="Student" value="student" accent-color=${this.StyleService.accentColor}></radio-button>
              </radio-button-group>
            </div>
            <div class="date-select flex">
              <div class="search-label">Date Range:</div>
              <canned-date-range accent-color=${this.StyleService.accentColor}></canned-date-range>
            </div>
            <div>
              <slide-button id="search-button">Search</slide-button>
            </div>

            <div class="table-container">
              <slide-table accent-color=${this.StyleService.accentColor} row-color="#f1d5d9"></slide-table>
            </div>

          </div>
        </div>

      </div>
    `;

    return t;
  }

  connectedCallback() {
    super.connectedCallback();

    const incidentSearch = this.find('#incident-radio');
    incidentSearch.selected = true;

    const headers = [
      new SlideTableHeader('Time', '250px', 'incidentTime', (t) => moment(parseInt(t)*1000).format('MM/DD/YYYY hh:mm a')),
      new SlideTableHeader('Student', '250px', 'studentString', (s) => {
        return new Promise( (resolve) => {
          this.UserService.getUser(s).then( user => {
            resolve(`${user.lastName}, ${user.firstName}`);
          });
        });
      }, false),
      new SlideTableHeader('Description', '250px', 'description', (t) => t, false),
      new SlideTableHeader('Status', '100px', 'status', (s) => {
        switch(s.value) {
          case 'PENDING_RESTITUTION':
          case 'PENDING_REFLECTION':
            return 'Pending';
          case 'COMPLETED':
            return 'Completed';
          case 'WAITING_ADMINISTRATION':
            return 'Waiting Admin.';
          default:
            return 'Unknown';
        }
      })
    ];

    this.find('slide-table').headers = headers;
  }

  addEventListeners() {
    this.find('#search-button').addEventListener('click', this.submitSearch);
    this.find('#search-button').addEventListener('keyup', this.submitSearch);
    this.find('slide-table').addEventListener('rowClicked', this.rowClicked);

    this.AuthorizationService.registerForChanges(this);
  }

  removeEventListeners() {
    this.find('#search-button').removeEventListener('click', this.submitSearch);
    this.find('#search-button').removeEventListener('keyup', this.submitSearch);
    this.find('slide-table').removeEventListener('rowClicked', this.rowClicked);
    this.AuthorizationService.unregister(this);
  }

  rowClicked = ($event) => {
    const event = new CustomEvent('urlchanged', {
      detail: {
        url: `/incident/view/${$event.detail.data._id}`,
        replace: true,
        data: $event.detail.data
      }
    });
    document.dispatchEvent(event);
  }

  userChanged = (user) => {
    if (user.role.value === 'STUDENT') {
      const r = this.find('#student-radio');
      r.parentElement.removeChild(r);
    }
  }

  submitSearch = ($event) => {
    if ($event.type === 'keyup' && $event.keyCode !== 13) {
      return;
    }

    const datePicker = this.find('canned-date-range');
    const searchPanel = this.find('incident-search');
    const from = datePicker.from;
    const to = datePicker.to;
    const states = searchPanel.states;
    const students = searchPanel.students;

    this.IncidentService.findIncidents(from, to, states, students)
      .then( results => {
        results.json().then( jData => {
          this.find('slide-table').data = jData;
        })
      });
  }
}

export default registerElement('StyleService', 'IncidentService', 'UserService', 'AuthorizationService')(IncidentSearchPage);
