import {BaseElement, registerElement} from 'single-malt';

import SlideCalendar from '../SlideCalendar';
import SlideTimePicker from '../SlideTimePicker';
import moment from 'moment';

class SlideDateTimePicker extends BaseElement {

  get template() {
    const t = `
      <style>
        .slide-date-time-picker {
          display: flex;
        }
      </style>
      <div class="slide-date-time-picker">
        <slide-calendar
          placeholder={{ placeholder }}
          accent-color=${this.StyleService.accentColor}
          text-color=${this.StyleService.textColor}>
        </slide-calendar>
        <slide-time-picker
          accent-color=${this.StyleService.accentColor}
          text-color=${this.StyleService.textColor}>
        </slide-time-picker>
      </div>
    `;

    return t;
  }

  setDefaults() {
    this._selectedDate = moment();
  }

  get selectedDate() {
    return this._selectedDate;
  }

  set selectedDate(aDate) {
    this._selectedDate = aDate;
    this.find('slide-calendar').selectedDay = aDate;
    this.find('slide-time-picker').time = aDate;
  }

  addEventListeners() {
    this.find('slide-calendar').addEventListener('datechange', this.dateChanged);
    this.find('slide-time-picker').addEventListener('datechange', this.dateChanged);
  }

  removeEventListeners() {
    this.find('slide-calendar').removeEventListener('datechange', this.dateChanged);
    this.find('slide-time-picker').removeEventListener('datechange', this.dateChanged);
  }

  dateChanged = ($event) => {
    if ($event.detail.isSame(this.selectedDate, 'minute')) {
      $event.stopPropagation();
      $event.preventDefault();
      return;
    }

    this.selectedDate = $event.detail;
    this.dispatchEvent(new CustomEvent('datechange', {detail: $event.detail}));
  }
}

export default registerElement('StyleService')(SlideDateTimePicker);
