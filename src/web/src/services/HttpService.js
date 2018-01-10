const bic_fetch = (url, params) => {
  return fetch(url, params)
    .catch( (err) => {
      const errDialog = document.getElementById('error-dialog');
      errDialog.show(err);
    });
}

export default bic_fetch;
