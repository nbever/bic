import {BaseElement, registerElement} from 'single-malt';

import SlideDateTimePicker from '../SlideDateTimePicker';
import moment from 'moment';
import forEach from 'lodash/forEach';
import isNil from 'lodash/isNil';

class CannedDateRange extends BaseElement {

  static TODAY = 0;
  static YESTERDAY = 1;
  static LAST_WEEK = 2;
  static LAST_MONTH = 3;
  static CUSTOM = 4;

  get template() {
    const t = `
      <style>
        .flex {
          display: flex;
        }

        .c-button {
          padding: 8px;
          padding-bottom: 4px;
          padding-top: 4px;
          border-radius: 20px;
          background-color: #ececec;
          margin-right: 12px;
          cursor: pointer;
          outline: none;
        }

        .c-button:focus {
          box-shadow: 0px 0px 4px 2px {{ accentColor }};
        }

        .c-button.selected {
          background-color: {{ accentColor }};
          color: white;
        }

        .hide {
          display: none;
        }

        .time-stuff {

        }
      </style>
      <div class="canned-date-range">
        <div class="flex">
          <div class="c-button" tabindex="0" data-value="${CannedDateRange.TODAY}">
            Today
          </div>
          <div class="c-button" tabindex="0" data-value="${CannedDateRange.YESTERDAY}">
            Yesterday
          </div>
          <div class="c-button selected" tabindex="0" data-value="${CannedDateRange.LAST_WEEK}">
            Last Week
          </div>
          <div class="c-button" tabindex="0" data-value="${CannedDateRange.LAST_MONTH}">
            Last Month
          </div>
          <div class="c-button" tabindex="0" data-value="${CannedDateRange.CUSTOM}">
            Custom
          </div>
        </div>
        <div class="time-stuff flex hide">
          <slide-date-time-picker id="from" placeholder="From"></slide-date-time-picker>
          <slide-date-time-picker id="to" placeholder="To"></slide-date-time-picker>
        </div>
      </div>
    `;

    return t;
  }

  setDefaults() {
    this._selectedValue = CannedDateRange.LAST_WEEK;
  }

  connectedCallback() {
    super.connectedCallback();

    this.fromField.selectedDate = moment().subtract(3, 'months');
    this.toField.selectedDate = moment();
  }

  get selectedValue() {
    return this._selectedValue;
  }

  set selectedValue(value) {
    this._selectedValue = value;
  }

  get toField() {
    if (isNil(this._toField)) {
      this._toField = this.find('#to');
    }

    return this._toField;
  }

  get fromField() {
    if (isNil(this._fromField)) {
      this._fromField = this.find('#from');
    }

    return this._fromField;
  }

  get to() {
    switch(parseInt(this.selectedValue)) {
      case CannedDateRange.CUSTOM:
        return this.toField.selectedDate;
      case CannedDateRange.TODAY:
      case CannedDateRange.YESTERDAY:
      case CannedDateRange.LAST_WEEK:
      case CannedDateRange.LAST_MONTH:
      default:
        return moment().endOf('day');
    }
  }

  get from() {
    switch(parseInt(this.selectedValue)) {
      case CannedDateRange.YESTERDAY:
        return moment().subtract(1, 'day').startOf('day');
      case CannedDateRange.LAST_WEEK:
        return moment().subtract(1, 'week').startOf('day');
      case CannedDateRange.LAST_MONTH:
        return moment().subtract(1, 'month').startOf('day');
      case CannedDateRange.CUSTOM:
        return this.fromField.selectedDate;
      case CannedDateRange.TODAY:
      default:
        return moment().startOf('day');
    }
  }

  addEventListeners() {
    const buttons = this.findAll('.c-button');

    forEach(buttons, button => {
      button.addEventListener('click', this.buttonSelected);
      button.addEventListener('keyup', this.buttonSelected);
    });

    this.fromField.addEventListener('datechange', this.fromChanged);
    this.toField.addEventListener('datechange', this.toChanged);
  }

  removeEventListeners() {
    const buttons = this.findAll('.c-button');

    forEach(buttons, button => {
      button.removeEventListener('click', this.buttonSelected);
      button.removeEventListener('keyup', this.buttonSelected);
    });

    this.fromField.removeEventListener('datechange', this.fromChanged);
    this.toField.removeEventListener('datechange', this.toChanged);
  }

  buttonSelected = ($event) => {

    if ($event.type === 'keyup') {
      if ($event.keyCode !== 13) {
        return;
      }
    }

    this.selectedValue = $event.srcElement.dataset.value;
    this.addClass(this.find('.time-stuff'), 'hide');

    forEach(this.findAll('.c-button'), button => {
      this.removeClass(button, 'selected');
    });

    this.addClass($event.srcElement, 'selected');

    if (parseInt($event.srcElement.dataset.value) === CannedDateRange.CUSTOM) {
      this.removeClass(this.find('.time-stuff'), 'hide');
    }
  }

  fromChanged = ($event) => {
    if ($event.detail.isAfter(this.toField.selectedDate, 'minute')) {
      this.toField.selectedDate = moment($event.detail).add(1, 'day');
    }
  }

  toChanged = ($event) => {
    if ($event.detail.isBefore(this.fromField.selectedDate, 'minute')) {
      this.fromField.selectedDate = moment($event.detail).subtract(1, 'day');
    }
  }
}

export default registerElement('StyleService')(CannedDateRange);
