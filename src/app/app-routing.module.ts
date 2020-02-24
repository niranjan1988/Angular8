import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from './shopping-list/shopping-edit/can-deactivate-guard';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'recipe', pathMatch: 'full' },
  {
    path: 'recipe',
    loadChildren: '../app/recipes/recipes.module#RecipesModule'
  },
  {
    path: 'shop',
    canDeactivate: [CanDeactivateGuard],
    component: ShoppingListComponent
  },
  {
    path: 'auth',
    loadChildren: '../app/Auth/auth.module#AuthModule'
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}


