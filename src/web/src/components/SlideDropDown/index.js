import { BaseElement, registerElement } from 'single-malt';

import isNil from 'lodash/isNil';
import filter from 'lodash/filter';
import forOwn from 'lodash/forOwn';
import findIndex from 'lodash/findIndex';

class SlideDropDown extends BaseElement {

  static AUTO_COMPLETE =  1;
  static STANDARD = 0;

  get template() {
    const template = `
    <style>
      input {
        border: 0px;
        background-color: transparent;
        outline: none;
        padding: 8px;
        font-size: 18px;
        border-bottom: 1px solid lightgray;
        transition: 200ms;
        margin-top: 24px;
        color: {{ textColor }}
      }

      input:focus {
        background-color: white;
        border-bottom: 0px;
        color: black;
      }

      .undertow {
        border-bottom: 4px solid {{ accentColor }};
        width: 0px;
        transition: 250ms;
      }

      .undertow.on {
        width: 100%;
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
        top: 12px;
        font-size: 12px;
      }

      .top.hideme {
        font-size: 12px;
        top: 12px;
      }

      #select {
        cursor: pointer;
        width: {{ width }};
      }

      .choices {
        border: 0px;
        height: 0px;
        text-align: left;
        overflow: auto;
        transition: 200ms;
        background-color: white;
        position: absolute;
        width: 100%;
        z-index: 2;
        top: 60px;
      }

      .choices.on {
        max-height: 192px;
        border: 1px solid lightgray;
        border-bottom: 4px solid {{ accentColor }};
      }

      .option {
        cursor: pointer;
        height: 24px;
        padding-left: 4px;
      }

      .option-hover {
        background-color: lightgray;
      }

      .arrow {
        position: absolute;
        top: 34px;
        right: 4px;
        font-size: 12px;
        color: gray;
        cursor: pointer;
      }

      .slide-drop-down {
        display: table;
        position: relative;
        margin: 4px;
        width: {{ width }}
      }
    </style>
    <div id="slide-dropdown" class="slide-drop-down">
      <div id="top2" class="top">{{ placeholder }}</div>
      <input id="select"/>
      <div class="choices">
      </div>
      <div id="dd-arrow" class="arrow">
        &#9660;
      </div>
    </div>`;

    return template;
  }

  setDefaults() {
    this._accentColor = 'black';
    this._textColor = 'white';
    this._selectedIndex = 0;
    this._mode = SlideDropDown.STANDARD;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  get mode() {
    return this._mode;
  }

  set mode(aMode) {
    this._mode = aMode;
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

  get width() {
    return this._width;
  }

  set width(width) {
    this._width = width;
  }

  get inputField() {
    if (isNil(this._inputField)) {
      this._inputField = this.find('input');
    }

    return this._inputField;
  }

  get dropdown() {
    if (isNil(this._dropdown)) {
      this._dropdown = this.find('.choices');
    }

    return this._dropdown;
  }

  get selectedIndex() {
    return this._selectedIndex;
  }

  set selectedIndex(index) {
    this._selectedIndex = index;
  }

  get selectedOption() {
    return this._selectedOption;
  }

  setSelectedKey(key) {
    const option = this.options[key];
    const htmlOptions = this.findAll('.option');
    const index = findIndex( htmlOptions, (opt) => {
      return opt.dataset.value === key;
    });

    this.inputField.value = option.displayText;
    this._selectedOption = option;
    this.selectedIndex = index;
    this.sanitizeField();
    this.focused();
  }

  get options() {
    return this._options;
  }

  set options(someOptions) {
    this._options = {};

    this.clearOptionHandlers();

    this.findAll('.option').forEach((o) => {
      this.dropdown.removeChild(o);
    });

    someOptions.forEach( (newO) => {
      this._options[newO.value] = newO;
      this.addOptionToDom(newO);
    });

    this.addOptionHandlers();
  }

  addOptionToDom = (option) => {
    const elem = document.createElement('div');
    elem.className = 'option';
    elem.dataset.value = option.value;
    elem.appendChild(document.createTextNode(option.displayText));
    this.dropdown.appendChild(elem);
  }

  get isPresecribed() {
    this._isPrescribed;
  }

  sanitizeField() {
    this._isPrescribed = true;
  }

  dirtyField() {
    this._isPrescribed = false;
  }

  addEventListeners = () => {
    this.inputField.addEventListener('focus', this.focused);
    this.inputField.addEventListener('click', this.openDrawer);
    this.find('#dd-arrow').addEventListener('click', this.openDrawer);
    this.inputField.addEventListener('keydown', this.stopTyping);
    this.inputField.addEventListener('keyup', this.filter);
    this.addOptionHandlers();
  }

  removeEventListeners = () => {
    this.inputField.removeEventListener('focus', this.focused);
    this.inputField.removeEventListener('click', this.openDrawer);
    this.find('#dd-arrow').removeEventListener('click', this.openDrawer);
    this.inputField.removeEventListener('keydown', this.stopTyping);
    this.inputField.removeEventListener('keyup', this.filter);

    this.clearOptionHandlers();
  }

  addOptionHandlers = () => {
    const options = this.findAll('.option');
    options.forEach( (o) => {
      o.addEventListener('click', this.optionChosen);
      o.addEventListener('mouseover', this.optionHovered);
    });
  }

  clearOptionHandlers = () => {
    const options = this.findAll('.option');
    options.forEach( (o) => {
      o.removeEventListener('click', this.optionChosen);
      o.removeEventListener('mouseover', this.optionHovered);
    });
  }

  optionChosen = ($event) => {
    this.inputField.value = $event.srcElement.textContent;
    this._selectedOption = this._options[this.findAll('.option')[this.selectedIndex].dataset.value];
    this.sanitizeField();
  }

  optionHovered = ($event) => {
    this.setHoverOption($event.srcElement);
  }

  setHoverOption = (option) => {
    // un-hover
    const options = this.findAll('.option').forEach( (o, index) => {
      if (o === option) {
        this.addClass(o, 'option-hover');
        this.selectedIndex = index;
        return;
      }

      this.removeClass(o, 'option-hover');
    });
  }

  focused = ($event) => {
    this.addClass(this.find('.top'), 'on');
  }

  stopTyping = ($event) => {
    if ($event.keyCode === 9) {
      return;
    }

    if ($event.keyCode === 13) {

      if (this.dropdown.className.indexOf('on') === -1) {
        this.openDrawer($event);
      }
      else {
        const option = this.findAll('.option')[this.selectedIndex];
        const choice = {
          srcElement: option,
          path: [option]
        };
        this.optionChosen(choice);
        this.closeDrawer(choice);
      }
      return;
    }

    if ($event.keyCode === 38) {
      if (this.selectedIndex !== 0) {
        this.selectedIndex = this.selectedIndex - 1;
        this.setHoverOption(this.findAll('.option')[this.selectedIndex]);
      }
      return;
    }

    if ($event.keyCode === 40) {
      if (this.selectedIndex !== this.findAll('.option').length-1) {
        this.selectedIndex = this.selectedIndex + 1;
        this.setHoverOption(this.findAll('.option')[this.selectedIndex]);
      }
      return;
    }

    if (this.mode !== SlideDropDown.AUTO_COMPLETE) {
      $event.preventDefault();
      $event.stopPropagation();
    }
    else {
      if (this.isPresecribed) {
        this.inputField.value = '';
        this.dirtyField();
      }
    }
  }

  filter = ($event) => {
    if (this.mode !== SlideDropDown.AUTO_COMPLETE ||
      $event.keyCode < 48 || $event.keyCode > 90) {
      return;
    }

    this.clearOptionHandlers();

    this.findAll('.option').forEach((o) => {
      this.dropdown.removeChild(o);
    });

    forOwn(this.options, (o) => {
      const text = this.inputField.value.trim().toLowerCase();
      if (o.displayText.trim().toLowerCase().indexOf(text) === -1) {
        return;
      }

      this.addOptionToDom(o);
    });

    this.addOptionHandlers();
    this.setDrawerHeight();
  }

  setDrawerHeight = () => {
    // find the height of the drawer
    const keys = this.findAll('.option').length;
    const height = keys > 8 ? 8 * 24 : keys * 24;
    this.dropdown.style.height = `${height}px`;
  }

  openDrawer = ($event) => {
    setTimeout( () => {
      document.addEventListener('click', this.closeDrawer);
    }, 500);

    if (this.dropdown.className.indexOf('on') !== -1) {
      this.closeDrawer($event);
      return;
    }

    this.addClass(this.dropdown, 'on');
    this.setDrawerHeight();
  }

  closeDrawer = ($event) => {
    document.removeEventListener('click', this.closeDrawer);

    if ($event.path[0].className.indexOf('option') !== -1) {
      this.inputField.value = $event.path[0].textContent;
    }

		this.removeClass(this.dropdown, 'on');
    this.dropdown.style.height = '0px';

    if (this.inputField.value === '') {
    	this.removeClass(this.find('.top'), 'on');
    }
  }
}

export default registerElement()(SlideDropDown);
