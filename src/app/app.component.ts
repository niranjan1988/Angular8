import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-first-angular8-app';
  isRecipe = true;

  onRecipeClick() {
    this.isRecipe = true;
  }

  onShoppingClick() {
    this.isRecipe = false;
  }

  setSection(type:boolean) {
    this.isRecipe = type;
  }
}
