export class AuthService {
  isLoggedIn: boolean;

  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      setInterval(() => {
        resolve(this.isLoggedIn);
      }, 1000);
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
