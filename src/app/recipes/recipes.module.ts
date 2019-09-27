import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RecipesComponent } from './recipes.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RecipeRoutingModule } from './recipes-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        RecipesComponent,
        RecipesListComponent,
        RecipesDetailComponent,
        RecipeEditComponent,
        RecipeStartComponent,
        RecipeItemComponent
    ],
    imports : [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        RecipeRoutingModule
    ]
})
export class RecipesModule { }