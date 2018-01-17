import isNil from 'lodash/isNil';

class UserService {

  constructor() {
    this.cacheStale = false;
  }

  get cacheStale() {
    this._userCacheStale;
  }

  set cacheStale(isIt) {
    this._userCacheStale = isIt;
  }

  get users() {
    if (this.cacheStale || isNil(this._users)) {
      return this.makeUserCall();
    }

    return new Promise( (resolve) => {
      resolve(this._users);
    });
  }

  getUser(uid) {
    return new Promise( (resolve, reject) => {
      this.users.then( users => {
        const foundUser = users.find( user => {
          return user._id === uid;
        });

        resolve(foundUser);
      });
    });
  }

  makeUserCall() {
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
          this._users = users;
          resolve(users);
        });
      });
    });
  }
}

export default UserService;
