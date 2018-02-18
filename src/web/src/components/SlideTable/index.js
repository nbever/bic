import {BaseElement, registerElement} from 'single-malt';

import forEach from 'lodash/forEach';
import isFunction from 'lodash/isFunction';
import isNumber from 'lodash/isNumber';

class SlideTable extends BaseElement {

  get template() {
    const t = `
      <style>
        table {
          border-collapse: collapse;
        }

        td {
          vertical-align: top;
          padding: 4px;
        }

        .headers {
          display: flex;
        }

        .header {
          background-color: #ececec;
          border-bottom: 4px solid {{accentColor}};
          padding: 4px;
          cursor: pointer;
          position: relative;
        }

        .header:hover {
          background-color: #cccccc;
        }

        .row {
          cursor: pointer;
        }

        .odd-row {
          background-color: {{rowColor}};
        }

        .sortAsc::after {
          content: '';
          position: absolute;
          right: 10px;
          top: 8px;
          border-bottom: 8px solid {{accentColor}};
          border-top: 0px;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
        }

        .sortDesc::after {
          content: '';
          position: absolute;
          right: 10px;
          top: 8px;
          border-top: 8px solid {{accentColor}};
          border-bottom: 0px;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
        }
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
    const headersElem = this.find('.headers');

    forEach(this.findAll('.header'), header => {
      header.removeEventListener('click', this.sortBy);
      headersElem.removeChild(header);
    });

    this._headers.forEach((header, index) => {
      const headerElem = document.createElement('div');
      headerElem.dataset.headerIndex = index;
      headerElem.addEventListener('click', this.sortBy);
      headerElem.className = 'header';
      headerElem.style.width = `${header.width}`;
      headerElem.innerHTML = header.display;
      headersElem.appendChild(headerElem);
    });
  }

  get headers() {
    return this._headers;
  }

  set data(someData) {
    this._data = someData;
    this.drawRows();
  }

  drawRows = () => {
    const table = this.find('tbody');

    forEach(this.findAll('.row'), row => {
      table.removeChild(row);
    });

    this.data.forEach((datum, index) => {
      const row = document.createElement('tr');
      row.addEventListener('click', () => this.rowClicked(datum));

      row.className = 'row';

      this.headers.forEach(header => {
        const td = document.createElement('td');
        td.style.width = `${header.width}`;

        if (index % 2 != 0) {
          td.className = 'odd-row';
        }

        const text = document.createTextNode('');
        td.appendChild(text);
        row.appendChild(td);

        const rzt = header.transform(datum[header.key]);
        if (isFunction(rzt.then)) {
          rzt.then( t => {
            datum.displayText = t;
            text.textContent = t;
          });
        }
        else {
          datum.displayText = rzt;
          text.textContent = rzt;
        }
      });

      table.appendChild(row);
    });
  }

  rowClicked = (datum) => {
    const event = new CustomEvent('rowClicked', { detail: { data: datum } });
    this.dispatchEvent(event);
  }

  get data() {
    return this._data;
  }

  sortBy = ($event) => {
    // this == header object
    const header = this.headers[$event.target.dataset.headerIndex];

    forEach(this.findAll('.header'), header => {
      if (header === $event.target) {
        return;
      }

      this.removeClass(header, 'sortAsc');
      this.removeClass(header, 'sortDesc');
    });

    if ($event.target.className.indexOf('sortAsc') !== -1) {
      this.removeClass($event.target, 'sortAsc');
      this.addClass($event.target, 'sortDesc');
    }
    else {
      this.removeClass($event.target, 'sortDesc');
      this.addClass($event.target, 'sortAsc');
    }

    this.data.sort((a, b) => {
      let rtn = 0;

      if (header.sortByValue === false) {
        rtn = a.displayText.toLowerCase().localeCompare(b.displayText.toLowerCase());
      }
      else if (isNumber(a[header.key])) {
        rtn = a[header.key] - b[header.key];
      }
      else {
        rtn = a[header.key].localeCompare(b[header.key]);
      }

      if ($event.target.className.indexOf('sortAsc') !== -1) {
        rtn = -1*rtn;
      }

      return rtn;
    });

    this.drawRows();
  }
}

export default registerElement('StyleService')(SlideTable);
