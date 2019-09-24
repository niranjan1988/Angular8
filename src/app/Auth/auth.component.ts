import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, authResponse } from '../shared/auth.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-auth',
    templateUrl: './Auth.component.html'
})
export class AuthComponent implements OnInit {
    isLoginMode = false;
    isLoading = false;
    error: string;

    constructor(private authService: AuthService) { }

    ngOnInit() { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (form.valid) {
            const email = form.value.email;
            const password = form.value.password;
            this.isLoading = true;
            let response: Observable<authResponse>;
            if (this.isLoginMode) {
                response = this.authService.signIn(email, password);
            } else {
                response = this.authService.signup(email, password)
            }
            response.subscribe(response => {
                console.log(response);
                this.isLoading = false;
            }, error => {
                console.log(error);
                this.error = error;
                this.isLoading = false;
            });
            form.reset();
        } else {
            return;
        }
    }
}
