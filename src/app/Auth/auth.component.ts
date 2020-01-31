import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponse } from '../shared/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth.actions';
import * as AppState from '../app.store';

@Component({
  selector: 'app-auth',
  templateUrl: './Auth.component.html'
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string;
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<AppState.IAppState>
  ) { }

  ngOnInit() {
    this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const email = form.value.email;
      const password = form.value.password;
      this.isLoading = true;
      let response: Observable<AuthResponse>;
      if (this.isLoginMode) {
        this.store.dispatch(new AuthActions.LoginStart({ email, password }));
      } else {
        response = this.authService.signup(email, password);
      }
      form.reset();
    } else {
      return;
    }
  }

  showErrorAlert(error: string) {
    console.log(error);
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
    componentRef.instance.message = error;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
