import { registerElement } from 'single-malt';
import DialogIf from '../DialogIf'
import SlideDropDown from '../../components/SlideDropDown';
import Option from '../../components/SlideDropDown/Option';
import isNil from 'lodash/isNil';

class ImpersonateDialog extends DialogIf {

  get template() {
    const t = `
      <style>
      </style>
      <div class="impersonate-dialog">
        <slide-drop-down
          placeholder="Choose user"
          accent-color=${this.StyleService.accentColor}
          text-color=${this.StyleService.textColor}
          width="350px">
        </slide-drop-down>
      </div>
    `;

    return t;
  }

  connectedCallback() {
    super.connectedCallback();

    const dropDown = this.find('slide-drop-down');
    dropDown.mode = SlideDropDown.AUTO_COMPLETE;
    this.UserService.users.then( (users) => {
      dropDown.options = users.map(user => {
        let nameString = `${user.lastName}, ${user.firstName}`;

        if (!isNil(user.graduatingClass)) {
          nameString += ` (${user.graduatingClass})`;
        }
        return new Option(user._id, nameString);
      });
    });
  }

  getSelectedUser = () => {
    const dropDown = this.find('slide-drop-down');
    return dropDown.selectedOption;
  }
}

export default registerElement('StyleService', 'UserService')(ImpersonateDialog);
