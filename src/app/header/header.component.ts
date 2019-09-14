import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  @Output() isRecipe = new EventEmitter<boolean>();

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.checkAuthentication();
  }

  logIn(){
    this.authService.logIn();
    this.checkAuthentication();
  }

  logOff(){
    this.authService.logOff();
    this.checkAuthentication();
  }
  checkAuthentication() {
    this.authService.isAuthenticated().then((isLoggedIn:boolean)=>{
      this.isLoggedIn=isLoggedIn;
    })
  }

}
