import { BaseElement, registerElement } from 'single-malt';

class ListItem extends BaseElement {

  get template() {
    const template = `
      <style>
        @import url('/assets/fonts/bic-icons/bic-icons.css');

        .row {
          display: flex;
          justify-content: space-between;
          width: 100%;
        }
        a {
          cursor: pointer;
          padding: 2px;
          color: gray;
          font-size: 12px;
          line-height: 1.2 !important;
        }
      </style>
      <div class="row">
        <div>{{item}}</div>
        <a class="bic-icon-cross delete"></a>
      </div>
    `;

    return template;
  }

  set callback(cb) {
    this._callback = cb;
  }

  get callback() {
    return this._callback;
  }

  deleteMe = () => {
    const anchor = this.find('a');
    anchor.removeEventListener('click', this.deleteMe);
    this.parentElement.removeChild(this);
    this.callback(this.item);
  }

  addEventListeners() {
    const anchor = this.find('a');
    anchor.addEventListener('click', this.deleteMe);
  }

  removeEventListeners() {
    const anchor = this.find('a');
    anchor.addEventListener('click', this.deleteMe);
  }
}

export default registerElement()(ListItem);
