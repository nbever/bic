import { BaseElement, registerElement } from 'single-malt';

import SlideDropDown from '../SlideDropDown';
import SlideButton from '../SlideButton';
import ListItem from './ListItem';
import isUndefined from 'lodash/isUndefined';
import some from 'lodash/some';

class SlideListBuilder extends BaseElement {

  addEventListeners() {
    const button = this.find('slide-button');
    button.addEventListener('click', this.addTerm);
  }

  removeEventListeners() {
    const button = this.find('slide-button');
    button.removeEventListener('click', this.addTerm);
  }

  get template() {
    const template = `
      <style>
        .side {
          display: flex;
        }

        .container {
          text-align: center;
        }

        .list-area {
          padding-top: 4px;
        }
      </style>
      <div>
        <div class="container">
          <slide-drop-down placeholder="{{placeholder}}" accent-color={{ accentColor }} text-color={{ textColor }}>
          </slide-drop-down>
          <slide-button width="100%">+</slide-button>
        </div>
        <div class="list-area">
        </div>
      </div>`;

    return template;
  }

  connectedCallback() {
    super.connectedCallback();
    this.find('slide-drop-down').mode = SlideDropDown.AUTO_COMPLETE;
  }

  set options(options) {
    this.find('slide-drop-down').options = options;
  }

  set accentColor(color) {
    this._accentColor = color;
  }

  get accentColor() {
    return this._accentColor;
  }

  set textColor(color) {
    this._textColor = color;
  }

  get textColor() {
    return this._textColor;
  }

  addTerm = () => {
    const dropdown = this.find('slide-drop-down');
    const testValue = dropdown.selectedOption;

    const alreadyChosen = some(this.terms, (t) => {
      return testValue === t;
    });

    if (alreadyChosen === true) {
      return;
    }

    this.terms.push(testValue);
    const item = document.createElement('list-item');
    item.setAttribute('item', testValue.displayText);
    item.callback = this.removeTerm;
    this.listArea.appendChild(item);
  }

  removeTerm = (term) => {
    this._terms = this.terms.filter( t => {
      return t.displayText !== term;
    });
  }

  get listArea() {
    return this.shadowRoot.querySelector('.list-area');
  }

  get terms() {
    if (isUndefined(this._terms)) {
      this._terms = [];
    }
    return this._terms;
  }

  set terms(someTerms) {
    this._terms = someTerms;
  }
}

export default registerElement()(SlideListBuilder);
