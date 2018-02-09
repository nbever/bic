import {BaseElement, registerElement} from 'single-malt';
import SlideListBuilder from '../../components/SlideListBuilder';
import Option from '../../components/SlideDropDown/Option';

import isNil from 'lodash/isNil';

class IncidentSearch extends BaseElement {

  get template() {
    const t = `
      <style>
        @import url('assets/fonts/bic-icons/bic-icons.css');

        .filter-panel {
          background-color: #cccccc;
          width: 250px;
          transition: 200ms;
          overflow: hidden;
        }

        .filter-panel.closed {
          width: 32px;
          overflow: hidden;
        }

        .search-blocks {
          overflow: auto;
          height: 100%;
        }

        .search-block {
          margin-bottom: 16px;
          padding-left: 24px;
          padding-right: 24px;
          padding-top: 12px;
        }

        .search-block>div:first-child {
          width: 100%;
          border-bottom: 1px solid ${this.StyleService.textColor};
          margin-bottom: 8px;
        }

        .flex {
          display: flex;
        }

        [class^="bic-icon-"], [class*=" bic-icon-"] {
          cursor: pointer;
        }

        .hide {
          display: none;
        }

        .invisible {
          visibility: hidden;
        }

        .rotate {
          width: 130px;
          transform: rotate(90deg);
          position: absolute;
          left: -50px;
          top: 102px;
          color: ${this.StyleService.textColor};
        }

        .title-bar {
          background-color: ${this.StyleService.accentColor};
          color: white;
          padding: 12px;
          display: flex;
          justify-content: space-between;
          z-index: 1;
        }

        .advanced-search {
          padding-left: 8px;
        }

        .side-by-side {
          position: relative;
          height: 100%;
          width: 100%;
        }
      </style>
      <div class="side-by-side flex">
        <div class="filter-panel">
          <div class="title-bar">
            <div class="rotate hide">Advanced Search</div>
            <div class="advanced-search">Advanced Search</div>
            <i class="bic-icon-circle-right hide"></i>
            <i class="bic-icon-circle-left"></i>
          </div>
          <div class="search-blocks">

            <div class="search-block">
              <div>Students</div>
              <slide-list-builder id="students" placeholder="Name" accent-color=${this.StyleService.accentColor} text-color=${this.StyleService.textColor}></slide-list-builder>
            </div>

            <div class="search-block">
              <div>Incident State</div>
              <slide-checkbox id="open" text-color=${this.StyleService.textColor} accent-color=${this.StyleService.accentColor}>
                <div>Waiting Admin.</div>
              </slide-checkbox>
              <slide-checkbox id="pending" text-color=${this.StyleService.textColor} accent-color=${this.StyleService.accentColor}>
                <div>Pending</div>
              </slide-checkbox>
              <slide-checkbox id="closed" text-color=${this.StyleService.textColor} accent-color=${this.StyleService.accentColor}>
                <div>Completed</div>
              </slide-checkbox>
            </div>

          </div>
        </div>
      </div>
    `;

    return t;
  }

  connectedCallback() {
    super.connectedCallback();

    const dropDown = this.find('slide-list-builder');
    this.UserService.students.then( (users) => {
      dropDown.options = users.map(user => {
        let nameString = `${user.lastName}, ${user.firstName}`;

        if (!isNil(user.graduatingClass)) {
          nameString += ` (${user.graduatingClass})`;
        }
        return new Option(user._id, nameString);
      });
    });
  }

  get states() {
    const statesSelected = [];

    if (this.find('#open').checked === true) statesSelected.push('WAITING_ADMINISTRATION');
    if (this.find('#pending').checked === true) statesSelected.push('PENDING_RESTITUTION');
    if (this.find('#closed').checked === true) statesSelected.push('COMPLETED');

    return statesSelected;
  }

  get students() {
    const listBuilder = this.find('#students');
    return listBuilder.terms.map((term) => {
      return term.value;
    });
  }

  get dateTypes() {
    const dateTypes = [];

    if (this.find('#occurence').checked === true) dateTypes.push('incident');
    if (this.find('#acceptance').checked === true) dateTypes.push('administer');
    if (this.find('#completion').checked === true) dateTypes.push('completed');

    return dateTypes;
  }

  addEventListeners() {
    this.find('.bic-icon-circle-left').addEventListener('click', this.hideAdvancedSearch);
    this.find('.bic-icon-circle-right').addEventListener('click', this.showAdvancedSearch);
  }

  removeEventListeners() {
    this.find('.bic-icon-circle-left').addEventListener('click', this.hideAdvancedSearch);
    this.find('.bic-icon-circle-right').addEventListener('click', this.showAdvancedSearch);
  }

  hideAdvancedSearch = () => {
    const filterPanel = this.find('.filter-panel');
    this.addClass(filterPanel, 'closed');

    this.addClass(this.find('.advanced-search'), 'hide');
    this.addClass(this.find('.bic-icon-circle-left'), 'hide');
    this.removeClass(this.find('.bic-icon-circle-right'), 'hide');
    this.removeClass(this.find('.rotate'), 'hide');
    this.addClass(this.find('.search-blocks'), 'invisible');
  }

  showAdvancedSearch = () => {
    const filterPanel = this.find('.filter-panel');
    this.removeClass(filterPanel, 'closed');
    this.removeClass(this.find('.advanced-search'), 'hide');
    this.addClass(this.find('.bic-icon-circle-right'), 'hide');
    this.removeClass(this.find('.bic-icon-circle-left'), 'hide');
    this.addClass(this.find('.rotate'), 'hide');
    this.removeClass(this.find('.search-blocks'), 'invisible');
  }
}

export default registerElement('StyleService', 'UserService')(IncidentSearch);
