class UserService {

  get users() {
    return new Promise( (resolve, reject) => {
      fetch('/api/users',
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then( (response) => {
        response.json().then( (users) => {
          resolve(users);
        });
      });
    });
  }
}

export default UserService;
