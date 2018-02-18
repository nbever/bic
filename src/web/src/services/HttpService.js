import { ServiceRegistry } from 'single-malt';

const bic_fetch = (url, params) => {
  const authService = ServiceRegistry.getService('AuthorizationService');
  params.headers['BIC-Token'] = authService.savedToken;

  return fetch(url, params)
    .catch( (err) => {
      const errDialog = document.getElementById('error-dialog');
      errDialog.show(err);
    });
}

export default bic_fetch;
