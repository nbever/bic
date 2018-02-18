import isNil from 'lodash/isNil';

class UserService {

  constructor() {
    this.cacheStale = false;
  }

  formatUserName(user) {
    return `${user.lastName}, ${user.firstName}`;
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

  get students() {
    return new Promise( (resolve) => {
      this.users.then(users => {
        const students = users.filter(u => {
          return u.role.value === 'STUDENT';
        });

        resolve(students);
      });
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
