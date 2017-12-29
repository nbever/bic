import { BaseElement, registerElement } from 'single-malt';

import isNil from 'lodash/isNil';

class SlideDropDown extends BaseElement {

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
      }

      .choices {
        border: 0px;
        height: 0px;
        text-align: left;
        overflow: hidden;
        transition: 200ms;
        background-color: white;
      }

      .choices.on {
        height: 48px;
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
      }
    </style>
    <div id="slide-dropdown" class="slide-drop-down">
      <div id="top2" class="top">{{ placeholder }}</div>
      <input id="select"/>
      <div class="choices" id="undertow2">
        <div class="option">Apple</div>
        <div class="option">Orange</div>
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
  }

  connectedCallback() {
    super.connectedCallback();
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

  get inputField() {
    if (isNil(this._inputField)) {
      this._inputField = this.find('input');
    }

    return this._inputField;
  }

  get selectedIndex() {
    return this._selectedIndex;
  }

  set selectedIndex(index) {
    this._selectedIndex = index;
  }

  get selectedOption() {
    return this._options[this.selectedIndex];
  }

  get options() {
    return this._options;
  }

  set options(someOptions) {
    this._options = someOptions;

    this.clearOptionHandlers();

    const parent = this.find('.choices');
    this.findAll('.option').forEach((o) => {
      parent.removeChild(o);
    });

    this._options.forEach( (newO) => {
      const elem = document.createElement('div');
      elem.className = 'choices';
      elem.dataset.value = newO.value;
      elem.appendChild(document.createTextNode(newO.displayText));
      parent.appendChild(elem);
    });

    this.addOptionHandlers();
  }

  addEventListeners = () => {
    this.inputField.addEventListener('focus', this.focused);
    this.inputField.addEventListener('click', this.openDrawer);
    this.find('#dd-arrow').addEventListener('click', this.openDrawer);
    this.inputField.addEventListener('keydown', this.stopTyping);
    this.addOptionHandlers();
  }

  removeEventListeners = () => {
    this.inputField.removeEventListener('focus', this.focused);
    this.inputField.removeEventListener('click', this.openDrawer);
    this.find('#dd-arrow').removeEventListener('click', this.openDrawer);
    this.inputField.removeEventListener('keydown', this.stopTyping);
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

      if (this.find('.choices').className.indexOf('on') === -1) {
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

    $event.preventDefault();
    $event.stopPropagation();
  }

  openDrawer = ($event) => {
    setTimeout( () => {
      document.addEventListener('click', this.closeDrawer);
    }, 500);

    if (this.find('.choices').className.indexOf('on') !== -1) {
      this.closeDrawer($event);
      return;
    }

    this.addClass(this.find('.choices'), 'on');
  }

  closeDrawer = ($event) => {
    document.removeEventListener('click', this.closeDrawer);

    if ($event.path[0].className.indexOf('option') !== -1) {
      this.inputField.value = $event.path[0].textContent;
    }

		this.removeClass(this.find('.choices'), 'on');

    if (this.inputField.value === '') {
    	this.removeClass(this.find('.top'), 'on');
    }
  }
}

export default registerElement()(SlideDropDown);
