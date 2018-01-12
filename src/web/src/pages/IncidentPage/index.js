import { BaseElement, registerElement } from 'single-malt';

import SlideCheckbox from '../../components/SlideCheckbox';
import RadioButtonGroup from '../../components/RadioButtonGroup';
import RadioButton from '../../components/RadioButton';

class IncidentPage extends BaseElement {

  get template() {
    const t = `
      <style>
        @import url('assets/fonts/bic-icons/bic-icons.css');

        #incident-page {
          padding-top: 24px;
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

        .search-type {
          display: flex;
        }

        .radio-button-group {
          display: flex;
        }

        .side-by-side {
          display: flex;
        }

        .search-label {
          padding-right: 8px;
        }

        .top-panel {
          margin-bottom: 12px;
          margin-left: 24px;
        }

        .filter-panel {
          background-color: #cccccc;
          width: 250px;
          transition: 200ms;
        }

        .filter-panel.closed {
          width: 32px;
          overflow: hidden;
        }

        .title-bar {
          background-color: ${this.StyleService.accentColor};
          color: white;
          padding: 12px;
          display: flex;
          justify-content: space-between;
          position: relative;
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

        [class^="bic-icon-"], [class*=" bic-icon-"] {
          cursor: pointer;
        }
      </style>
      <div id="incident-page">
        <div class="top-panel">
          <div class="search-type">
            <div class="search-label">Search Type:</div>
            <radio-button-group layout=${RadioButtonGroup.HORIZONTAL}>
              <radio-button id="student-radio" text="Student" value="student" accent-color=${this.StyleService.accentColor}></radio-button>
              <radio-button id="incident-radio" text="Incident" value="incident" accent-color=${this.StyleService.accentColor}></radio-button>
            </radio-button-group>
          </div>
          <div class="date-select">
            <div class="search-label">Date Range:</div>

          </div>
        </div>

        <div class="side-by-side">
          <div class="filter-panel">
            <div class="title-bar">
              <div class="advanced-search">Advanced Search</div>
              <div class="rotate hide">Advanced Search</div>
              <i class="bic-icon-circle-left"></i>
              <i class="bic-icon-circle-right hide"></i>
            </div>
            <div class="search-blocks">
              <div class="years search-block">
                <div>Class</div>
                <slide-checkbox id="freshman" text-color=${this.StyleService.textColor} accent-color=${this.StyleService.accentColor}>
                  <div>Freshman</div>
                </slide-checkbox>
                <slide-checkbox id="sophomore" text-color=${this.StyleService.textColor} accent-color=${this.StyleService.accentColor}>
                  <div>Sophomore</div>
                </slide-checkbox>
                <slide-checkbox id="junior" text-color=${this.StyleService.textColor} accent-color=${this.StyleService.accentColor}>
                  <div>Junior</div>
                </slide-checkbox>
                <slide-checkbox id="senior" text-color=${this.StyleService.textColor} accent-color=${this.StyleService.accentColor}>
                  <div>Senior</div>
                </slide-checkbox>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    return t;
  }

  connectedCallback() {
    super.connectedCallback();

    const studentSearch = this.find('#student-radio');
    studentSearch.selected = true;
    this.find('#senior').checked = true;
    this.find('#freshman').checked = true;
    this.find('#junior').checked = true;
    this.find('#sophomore').checked = true;
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

export default registerElement('StyleService')(IncidentPage);
