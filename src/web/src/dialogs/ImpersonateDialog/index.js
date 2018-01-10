import { registerElement } from 'single-malt';
import DialogIf from '../DialogIf'
import SlideDropDown from '../../components/SlideDropDown';
import Option from '../../components/SlideDropDown/Option';

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
        return new Option(user._id, `${user.lastName}, ${user.firstName} (${user.graduatingClass})`);
      });
    });
  }

  getSelectedUser = () => {
    const dropDown = this.find('slide-drop-down');
    return dropDown.selectedOption;
  }
}

export default registerElement('StyleService', 'UserService')(ImpersonateDialog);
