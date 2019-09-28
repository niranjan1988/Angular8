import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesComponent } from './recipes.component';


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
        RouterModule,
        SharedModule,
        ReactiveFormsModule        
    ],
    exports : [
        RecipesComponent,
        RecipesListComponent,
        RecipesDetailComponent,
        RecipeEditComponent,
        RecipeStartComponent,
        RecipeItemComponent
    ]
})
export class RecipesModule { }