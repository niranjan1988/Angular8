import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthguardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // this.authService.isAuthenticated().then((authenticated: boolean) => {
    //   if (authenticated) {
    //     return true;
    //   } else {
    //     this.router.navigate(['/']);
    //     return false;
    //   }
    // });
    return true;
  }
}
