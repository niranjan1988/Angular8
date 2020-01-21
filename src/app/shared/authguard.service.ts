import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as fromAppStore from '../../app/app.store';
import {Store} from '@ngrx/store';

@Injectable()
export class AuthguardService implements CanActivate, CanActivateChild {
  isAuthenticated = false;
  constructor(private authService: AuthService, private router: Router, private store: Store<fromAppStore.IAppState>) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => {
        return authState.user;
      }),
      map(userInfo => {
        this.isAuthenticated = !!userInfo;
        if (this.isAuthenticated) {
          return true;
        } else {
          this.router.navigate(['/auth']);
          return false;
        }
      })
    );
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
