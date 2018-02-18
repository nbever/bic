import { BaseElement, registerElement } from 'single-malt';

import SlideDropDown from '../../../../components/SlideDropDown';
import SlideSpinner from '../../../../components/SlideSpinner';
import SlideCalendar from '../../../../components/SlideCalendar';
import SlideCheckbox from '../../../../components/SlideCheckbox';

import forEach from 'lodash/forEach';

class DisciplineBox extends BaseElement {

  get template() {
    const t = `
      <style>
        .discipline-box {
          display: flex;
        }

        .slash {
          font-size: 24px;
          padding-top: 34px;
          padding-left: 4px;
          padding-right: 4px;
        }

        slide-checkbox {
          padding-top: 34px;
          padding-left: 16px;
        }
      </style>
      <div class="discipline-box">
        <slide-drop-down
          id="discipline-type"
          accent-color=${this.StyleService.accentColor}
          text-color=${this.StyleService.textColor}
        >
        </slide-drop-down>
        <slide-calendar class="event"
          id="discipline-date"
          accent-color=${this.StyleService.accentColor}
          text-color=${this.StyleService.textColor}
        >
        </slide-calendar>
        <slide-spinner
          id="served"
          class="hours"
          placeholder="Done"
          accent-color=${this.StyleService.accentColor}
          text-color=${this.StyleService.textColor}
        >
        </slide-spinner>
        <div class="slash">/</div>
        <slide-spinner
          id="total"
          class="hours"
          placeholder="Total"
          accent-color=${this.StyleService.accentColor}
          text-color=${this.StyleService.textColor}
        >
        </slide-spinner>
        <slide-checkbox
          id="completed"
          accent-color=${this.StyleService.accentColor}
          text-color=${this.StyleService.textColor}
        >
          <div>Completed</div>
        </slide-checkbox>
      </div>
    `;

    return t;
  }

  connectedCallback() {
    super.connectedCallback();

    forEach(this.findAll('slide-spinner'), (spinner) => spinner.max = 100 );
  }

  get discipline() {
    return this._discipline;
  }

  set discipline(discipline) {
    this._discipline = discipline;
  }
}

export default registerElement('StyleService')(DisciplineBox);
