export class AuthService {
  isLoggedIn = false;

  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      setInterval(() => {
        resolve(this.isLoggedIn);
      }, 10);
    });
    return promise;
  }

  logIn() {
    this.isLoggedIn = true;
  }

  logOff() {
    this.isLoggedIn = false;
  }
}
