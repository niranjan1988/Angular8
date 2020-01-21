import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppReducer } from './app.store';
import { AuthInterceptorService } from './Auth/auth-interceptor.service';
import { AuthModule } from './Auth/auth.module';
import { HeaderComponent } from './header/header.component';
import { RecipesModule } from './recipes/recipes.module';
import { RecipeService } from './recipes/recipes.service';
import { AlertComponent } from './shared/alert/alert.component';
import { AuthService } from './shared/auth.service';
import { AuthguardService } from './shared/authguard.service';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';
import { CanDeactivateGuard } from './shopping-list/shopping-edit/can-deactivate-guard';
import { ShoppingListModule } from './shopping-list/shopping-list.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(AppReducer),
    AppRoutingModule,
    RecipesModule,
    ShoppingListModule,
    AuthModule
  ],
  providers: [
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
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent]
})
export class AppModule { }
