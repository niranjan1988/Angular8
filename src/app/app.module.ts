import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './Auth/auth-interceptor.service';
import { HeaderComponent } from './header/header.component';
import { RecipesModule } from './recipes/recipes.module';
import { RecipeService } from './recipes/recipes.service';
import { AuthService } from './shared/auth.service';
import { AuthguardService } from './shared/authguard.service';
import { CanDeactivateGuard } from './shopping-list/shopping-edit/can-deactivate-guard';
import { ShoppingService } from './shopping-list/shoppingList.service';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './Auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { ShoppingListReducer } from './shopping-list/store/shopping-list.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({ shoppingList: ShoppingListReducer }),
    AppRoutingModule,
    RecipesModule,
    ShoppingListModule,
    AuthModule
  ],
  providers: [
    ShoppingService,
    RecipeService,
    AuthguardService,
    AuthService,
    CanDeactivateGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
