import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from '../recipes/recipes.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  @Output() isRecipe = new EventEmitter<boolean>();

  constructor(private authService: AuthService,
     private dataStorageService: DataStorageService,
     private router:Router) { }

  ngOnInit() {
    this.authService.user.subscribe(userInfo => {
      this.isAuthenticated = !!userInfo;
    });
  }

  saveData() {
    this.dataStorageService.storeRecipes().subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  signoff() {
    this.authService.Signoff();
    this.router.navigate(['/auth']);
  }
}
