import {BaseElement, registerElement} from 'single-malt';

import forEach from 'lodash/forEach';
import isFunction from 'lodash/isFunction';

class SlideTable extends BaseElement {

  get template() {
    const t = `
      <style>
      </style>
      <div class="slide-table">
        <div class="headers">
        </div>
        <table>
          <tbody>
          </tbody>
        </table>
      </div>
    `;

    return t;
  }

  set headers(someHeaders) {
    this._headers = someHeaders;

    forEach(this.findAll('.header'), header => {
      this.removeChild(header);
    });

    this._headers.forEach(header => {

    });
  }

  get headers() {
    return this._headers;
  }

  set data(someData) {
    this._data = someData;

    const table = this.find('tbody');

    forEach(this.findAll('.row'), row => {
      table.removeChild(row);
    });

    this._data.forEach(datum => {
      const row = document.createElement('tr');
      row.className = 'row';

      this.headers.forEach(header => {
        const td = document.createElement('td');
        const text = document.createTextNode('');
        td.appendChild(text);
        row.appendChild(td);

        const rzt = header.transform(datum[header.key]);
        if (isFunction(rzt.then)) {
          rzt.then( t => {
            text.textContent = t;
          });
        }
        else {
          text.textContent = rzt;
        }
      });

      table.appendChild(row);
    });
  }

  get data() {
    return this._data;
  }
}

export default registerElement('StyleService')(SlideTable);
