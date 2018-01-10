import isFunction from 'lodash/isFunction';

class ModalService {

  showDialog = (title, contents, mode = 0) => {
    const bModal = require('../components/Modal');
    const modal = new bModal.default();
    modal.title = title;
    modal.setContent(contents);
    modal.mode = mode;

    const body = document.getElementsByTagName('body')[0];
    body.appendChild(modal);

    const dp = new Promise((resolve, reject) => {

      const closer = () => {
        modal.close();
        modal.removeEventListener('dialog-close', closer);
        modal.removeEventListener('dialog-ok-pressed', validateAndClose);
        body.removeChild(modal);
      };

      const validateAndClose = () => {
        const innerContent = modal.find('#inner-content').firstChild;

        if (isFunction(innerContent.validate)) {
          const isValid = innerContent.validate();
          if (isValid === false) {
            reject(innerContent);
          }
        }

        resolve({form: innerContent, closer});
      };

      modal.addEventListener('dialog-close', closer);
      modal.addEventListener('dialog-ok-pressed', validateAndClose);
      modal.show();
    });

    return dp;
  }
}

export default ModalService;
