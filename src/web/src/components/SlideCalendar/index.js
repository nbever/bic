import { BaseElement, registerElement } from 'single-malt';

import moment from 'moment';
import isNil from 'lodash/isNil';
import forEach from 'lodash/forEach';

class SlideCalendar extends BaseElement {

  get template() {
    const template = `
      <style>
        @import url('/assets/fonts/bic-icons/bic-icons.css');

        .flex {
          display: flex;
        }

        .slide-calendar {
          position: relative;
          text-align: left;
          width: 108px;
          margin-right: 28px;
        }

        .input-field {
          border: 0px;
          background-color: transparent;
          outline: none;
          padding: 8px;
          font-size: 18px;
          border-bottom: 1px solid {{ textColor }};
          transition: 200ms;
          margin-top: 28px;
          width: 94px;
          color: {{ textColor }};
        }

        .input-field:focus {
          background-color: white;
          color: black;
          border-bottom: 0px;
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

        .calendar-icon {
          padding-top: 38px;
          padding-left: 6px;
          cursor: pointer;
        }

        .drawer {
          height: 0px;
          width: 100%;
          position: absolute;
          top: 66px;
          overflow: hidden;
          z-index: 1;
        }

        .drawer.open {
          height: 150px;
          transition: 250ms;
        }

        .month-header {
          background-color: #e5e5e5;
        }

        .month-name {
          flex-grow: 1;
        }

        .cal-button {
          width: 10px;
          cursor: pointer;
        }

        .header {
          border-bottom: 1px solid darkgray;
          font-size: 13px;
          text-align: center;
        }

        .cal-button:hover {
          background-color: #F0F0F0;
        }

        .header > div {
          background-color: #e5e5e5;
          width: 16px;
          height: 16px;
          text-align: center;
          font-size: 10px;
        }

        .date-box {
          width: 10px;
          height: 10px;
          text-align: center;
          margin: 1px;
          padding: 2px;
          font-size: 11px;
          cursor: pointer;
          border: 1px solid white;
          border-radius: 2px;
        }

        .date-box:hover {
          border: 1px solid #e5e5e5;
        }

        .date-box.selected {
          background-color: {{ accentColor }};
        }

        .cal-body {
          background-color: white;
          flex-wrap: wrap;
        }

        .unclickable {
          border-color: white;
        }
      </style>
      <div class="slide-calendar">
        <div class="top">
          {{ placeholder }}
        </div>
        <div class="top-part flex">
          <div class="text-portion">
            <input class="input-field">
            </input>
            <div class="undertow">
            </div>
          </div>
          <div class="calendar-icon bic-icon-calendar">
          </div>
        </div>
        <div class="drawer">
          <div class="month-header flex">
            <div class="cal-button">&Lang;</div>
            <div class="cal-button">&lang;</div>
            <div class="month-name"></div>
            <div class="cal-button">&rang;</div>
            <div class="cal-button">&Rang;</div>
          </div>
          <div class="header-bar">
            <div class="header flex">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
          </div>
          <div class="cal-body flex">
          </div>
        </div>
      </div>
    `;

    return template;
  }

  setDefaults() {
    this._showDrawer = false;
    this._selectedDay = moment();
    this._visibleDay = moment();
    this._textColor = 'white';
    this._accentColor = 'red';
  }

  get inputField() {
    if ( isNil(this._inputField) ) {
      this._inputField = this.find( 'input' );
    }

    return this._inputField;
  }

  get undertow() {
    if ( isNil(this._undertow)) {
      this._undertow = this.find('.undertow');
    }

    return this._undertow;
  }

  get textColor() {
    return this._textColor;
  }

  set textColor(aColor) {
    this._textColor = aColor;
  }

  get drawer() {
    if ( isNil(this._drawer)) {
      this._drawer = this.find('.drawer');
    }

    return this._drawer;
  }

  get drawerOpen() {
    return this._showDrawer;
  }

  set drawerOpen(showIt) {
    this._showDrawer = showIt;
  }

  get selectedDay() {
    return this._selectedDay;
  }

  set selectedDay(aDay) {
    this._selectedDay = aDay;
    this.inputField.setAttribute('value', this._selectedDay.format( 'MM/DD/YYYY' ) );
    this.fieldFocused();
    this.fieldUnfocused();

    const event = new CustomEvent('datechange', {detail: this._selectedDay});
    this.dispatchEvent(event);
  }

  get visibleDay() {
    return this._visibleDay;
  }

  set visibleDay(aDay) {
    this._visibleDay = aDay;
  }

  addEventListeners() {
    this.inputField.addEventListener( 'focus', this.fieldFocused );
    this.inputField.addEventListener( 'blur', this.fieldUnfocused );
    this.find( '.calendar-icon' ).addEventListener( 'click', this.showDrawer );
    this.drawer.addEventListener('keyup', this.calKeyPressed);
    this.drawer.addEventListener( 'click', this.calendarClicked );

    const jumpButtons = this.findAll('.cal-button');
    jumpButtons[0].addEventListener('click', this.dateJump.bind(this, -1, 'year') );
    jumpButtons[1].addEventListener('click', this.dateJump.bind(this, -1, 'month') );
    jumpButtons[2].addEventListener('click', this.dateJump.bind(this, 1, 'month') );
    jumpButtons[3].addEventListener('click', this.dateJump.bind(this, 1, 'year') );
  }

  removeEventListeners() {
    this.inputField.removeEventListener( 'focus', this.fieldFocused );
    this.inputField.removeEventListener( 'blur', this.fieldUnfocused );
    this.find( '.calendar-icon' ).removeEventListener( 'click', this.showDrawer );
    this.drawer.removeEventListener('keyup', this.calKeyPressed);
    this.drawer.removeEventListener('click', this.calendarClicked );
    const jumpButtons = this.findAll('.cal-button');
    jumpButtons[0].removeEventListener('click', this.dateJump );
    jumpButtons[1].removeEventListener('click', this.dateJump );
    jumpButtons[2].removeEventListener('click', this.dateJump );
    jumpButtons[3].removeEventListener('click', this.dateJump );
  }

  fieldUnfocused = () => {

    this.removeClass(this.undertow, 'on');

    if ( this.inputField.value.trim() === '' ) {
      this.removeClass(this.find('.top'), 'on');
    }
  }

  fieldFocused = () => {
    this.addClass(this.undertow, 'on');
    this.addClass(this.find('.top'), 'on');
  }

  showDrawer = ($event) => {
    if ( !isNil($event) ) {
      $event.stopPropagation();
    }

    this.drawerOpen = true;
    this.fieldFocused();
    this.visibleDay = moment(this.selectedDay);
    this.buildCalendarView();
  }

  buildCalendarView = () => {
    const currentSelection = moment(this.visibleDay);
    this.find('.month-name').textContent = currentSelection.format('MMM YYYY');
    this.addClass( this.drawer, 'open' );

    document.addEventListener('click', this.documentClicked);

    this.addDateBoxes(currentSelection);
  }

  closeDrawer = () => {
    document.removeEventListener('click', this.documentClicked);
    this.drawerOpen = false;
    this.fieldUnfocused();
    this.removeClass(this.drawer, 'open');
  }

  addDateBoxes = (startDate) => {

    const dayContainer = this.find('.cal-body');

    if ( !isNil(dayContainer.children) && dayContainer.children.length > 0 ) {
      this.cleanChildren(dayContainer);
    }

    startDate.date(1);
    const dayOfTheWeek =  startDate.day();

    this.createBlankDays( dayOfTheWeek, dayContainer );

    const maxDate = moment(startDate);
    maxDate.add( 1, 'month' ).date(1);
    maxDate.subtract( 1, 'day' );
    const daysToCreate = maxDate.date();

    this.createRealDays( daysToCreate, dayContainer, startDate );
  }

  cleanChildren = (elem) => {

    while ( !isNil(elem.firstChild) ) {
      elem.firstChild.removeEventListener('click', this.dayClicked);
      elem.removeChild(elem.firstChild);
    }
  }

  createBlankDays = (num, elem) => {
    for ( let i = 0; i < num; i++ ) {
      const blank = document.createElement('div');
      blank.setAttribute('class', 'date-box unclickable');
      elem.appendChild(blank);
    }
  }

  createRealDays = (num, elem, date) => {
    for ( let i = 0; i < num; i++ ) {
      const day = document.createElement('div');
      day.setAttribute('class', 'date-box');
      day.addEventListener('click', this.dayClicked);
      day.setAttribute('day', moment(date).date((i+1)).format('MM/DD/YYYY') );

      if ((i+1) === this.selectedDay.date() && date.month() === this.selectedDay.month()) {
        day.setAttribute( 'class', `${day.getAttribute('class')} selected` );
      }

      day.textContent = (i+1) + '';
      elem.appendChild(day);
    }
  }

  dayClicked = ($event) => {
    const day = moment($event.srcElement.getAttribute('day'), 'MM/DD/YYYY')
    this.selectedDay = day;
    this.closeDrawer();
  }

  calendarClicked = ($event) => {
    $event.stopPropagation();
  }

  calKeyPressed = ($event) => {

    // tab
    if ($event.keyCode === 9) {
      this.closeDrawer();
      return;
    }
  }

  documentClicked = () => {

    // only gets here if it's not in the calendar
    this.closeDrawer();
  }

  dateJump = (amount = 1, unit = 'months' ) => {
    this.visibleDay.add(amount, unit);
    this.buildCalendarView();
  }
}

export default registerElement()(SlideCalendar);
