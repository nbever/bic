import { BaseElement, registerElement } from 'single-malt';

import isNil from 'lodash/isNil';
import moment from 'moment';

class SlideTimePicker extends BaseElement {

  get template() {
    const template = `
        <style>
        .slide-time-picker {
          position: relative;
          margin-right: 12px;
        }

        input {
          border: 0px;
          background-color: transparent;
          outline: none;
          padding: 8px;
          padding-left: 2px;
          padding-right: 2px;
          font-size: 18px;
          border-bottom: 1px solid lightgray;
          transition: 200ms;
          margin-top: 28px;
          -webkit-appearance: textfield;
          color: {{ textColor }};
        }

        #hour-spinner {
          padding-left: 10px;
        }

        .am-spinner {
          flex-grow: 1;
        }

        input:focused {
          background-color: {{ accentColor }};
        }

        .input-section {
          display: flex;
        }

        .input-focus {
          background-color: white;
          border-bottom: 0px;
          color: black;
        }

        .top {
          color: darkgray;
          position: absolute;
          top: 32px;
          left: 8px;
          font-size: 18px;
          pointer-events: none;
          transition: 200ms;
        }

        .top.on {
          top: 18px;
          font-size: 12px;
        }

        .undertow {
          border-bottom: 4px solid {{ accentColor }};
          width: 0px;
          transition: 250ms;
        }

        .undertow.on {
          width: 100%;
        }

        .slide-time-picker {
          width: 113px;
        }

        span {
          color: {{ textColor }};
          padding-top: 30px;
          padding-left: 4px;
          padding-right: 4px;
          font-size: 24px;
        }
      </style>
      <div class="slide-time-picker">
        <div class="top on">{{placeholder}}</div>
        <div style="position: relative;">
          <div class="input-section">
            <input id="hour-spinner" size="2"></input>
            <span>:</span>
            <input id="minute-spinner" size="2"></input>
            &nbsp;
            <input id="am-spinner" size="2"></input>
          </div>
          <div class="undertow"></div>
        </div>
      </div>
    `;

    return template;
  }

  setDefaults() {
    this._accentColor = 'black';
    this._textColor = 'white';
    this.placeholder = '';
  }

  connectedCallback() {
    super.connectedCallback();

    const timeString = this.time.format('hh:mm A');
    this.hourSpinner.value = timeString.substring(0, 2);
    this.minuteSpinner.value = timeString.substring(3, 5);
    this.amPmInput.value = timeString.substring(6);
  }

  addEventListeners() {
    this.minuteSpinner.addEventListener('focus', this.fieldFocused);
    this.hourSpinner.addEventListener('focus', this.fieldFocused);
    this.amPmInput.addEventListener('focus', this.fieldFocused);

    this.minuteSpinner.addEventListener('blur', this.fieldUnfocused);
    this.hourSpinner.addEventListener('blur', this.fieldUnfocused);
    this.amPmInput.addEventListener('blur', this.fieldUnfocused);

    this.minuteSpinner.addEventListener('keydown', this.minuteDown);
    this.hourSpinner.addEventListener('keydown', this.hourDown);
    this.amPmInput.addEventListener('keydown', this.amDown);

    this.minuteSpinner.addEventListener('keyup', this.minuteUp);
    this.hourSpinner.addEventListener('keyup', this.hourUp);
  }

  removeEventListeners() {
    this.minuteSpinner.removeEventListener('focus', this.fieldFocused);
    this.hourSpinner.removeEventListener('focus', this.fieldFocused);
    this.amPmInput.removeEventListener('focus', this.fieldFocused);

    this.minuteSpinner.removeEventListener('blur', this.fieldUnfocused);
    this.hourSpinner.removeEventListener('blur', this.fieldUnfocused);
    this.amPmInput.removeEventListener('blur', this.fieldUnfocused);

    this.minuteSpinner.removeEventListener('keydown', this.minuteDown);
    this.hourSpinner.removeEventListener('keydown', this.hourDown);
    this.amPmInput.removeEventListener('keydown', this.amDown);

    this.minuteSpinner.removeEventListener('keyup', this.minuteUp);
    this.hourSpinner.removeEventListener('keyup', this.hourUp);
  }

  get minuteSpinner() {
    if (isNil(this._minuteSpinner)) {
      this._minuteSpinner = this.find('#minute-spinner');
    }

    return this._minuteSpinner;
  }

  get hourSpinner() {
    if (isNil(this._hourSpinner)) {
      this._hourSpinner = this.find('#hour-spinner');
    }

    return this._hourSpinner;
  }

  get amPmInput() {
    if (isNil(this._amPmInput)) {
      this._amPmInput = this.find('#am-spinner');
    }

    return this._amPmInput;
  }

  get time() {
    if (isNil(this._time)) {
      this._time = moment();
    }
    return this._time;
  }

  set time(newTime) {
    this._time = newTime;

    const timeString = this.time.format('hh:mm A');
    this.hourSpinner.value = timeString.substring(0, 2);
    this.minuteSpinner.value = timeString.substring(3, 5);
    this.amPmInput.value = timeString.substring(6);

    const event = new CustomEvent('datechange', {detail: this._time});
    this.dispatchEvent(event);
  }

  get accentColor() {
    return this._accentColor;
  }

  set accentColor(aColor) {
    this._accentColor = aColor;
  }

  get textColor() {
    return this._textColor;
  }

  set textColor(aColor) {
    this._textColor = aColor;
  }

  get focused() {
    return this._focused;
  }

  set focused(amIFocused) {
    this._focused = amIFocused;
  }

  minuteDown = ($event) => {
    if ($event.keyCode === 9) {
      return;
    }

    // it's not a number!
    if ($event.keyCode < 48 && $event.keyCode > 57) {
      $event.preventDefault();
      $event.stopPropagation();
    }
  }

  hourDown = ($event) => {
    if ($event.keyCode === 9) {
      return;
    }

    // it's not a number!
    if ($event.keyCode < 48 && $event.keyCode > 57) {
      $event.preventDefault();
      $event.stopPropagation();
    }
  }

  minuteUp = ($event) => {
    const minuteValue = parseInt(this.minuteSpinner.value);

    if ($event.keyCode === 38) {
      if (minuteValue > 59) {
        return;
      }
      this.time = moment(this.time).minute(minuteValue + 1);
    }
    else if ($event.keyCode === 40) {
      if (minuteValue < 1) {
        return;
      }

      this.time = moment(this.time).minute(minuteValue - 1);
    }
    else {
      if (isNaN(minuteValue) || minuteValue < 0 || minuteValue > 59) {
        this.time = moment(this.time);
        return;
      }

      this.time = moment(this.time).minute(minuteValue);
    }
  }

  hourUp = ($event) => {
    const hourValue = parseInt(this.hourSpinner.value);

    if ($event.keyCode === 38) {
      if (hourValue > 11) {
        return;
      }
      this.time = moment(this.time).hour(hourValue + 1);
    }
    else if ($event.keyCode === 40) {
      if (hourValue < 2) {
        return;
      }
      this.time = moment(this.time).hour(hourValue - 1);
    }
    else {
      if (isNaN(hourValue) || hourValue < 1 || hourValue > 12) {
        this.time = moment(this.time);
        return;
      }

      this.time = moment(this.time).hour(hourValue);
    }
  }

  amDown = ($event) => {
    if ($event.keyCode === 9) {
      return;
    }

    const hours = this.time.hour();

    if ($event.keyCode === 65) {
      if (hours > 12) {
        this.time = moment(this.time).hour(hours-12);
      }
    }

    if ($event.keyCode == 80) {
      if (hours < 13) {
        this.time = moment(this.time).hour(hours+12);
      }
    }

    $event.preventDefault();
    $event.stopPropagation();
  }

  fieldFocused = ($event) => {
    if (this.focused === true) {
      // we're already showing it as focused.
      return;
    }

    this.addClass(this.find('.undertow'), 'on');
    this.addClass(this.amPmInput, 'input-focus');
    this.addClass(this.hourSpinner, 'input-focus');
    this.addClass(this.minuteSpinner, 'input-focus');

    this.focused = true;
  }

  fieldUnfocused = ($event) => {
    const anyMatch = [this.amPmInput, this.hourSpinner, this.minuteSpinner].some( (elem) => {
      return $event.path[0] === elem;
    });

    this.removeClass(this.find('.undertow'), 'on');
    this.removeClass(this.amPmInput, 'input-focus');
    this.removeClass(this.hourSpinner, 'input-focus');
    this.removeClass(this.minuteSpinner, 'input-focus');

    this.focused = false;
  }
}

export default registerElement()(SlideTimePicker);
