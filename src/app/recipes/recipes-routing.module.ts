import { Routes, RouterModule } from "@angular/router";
import { AuthguardService } from '../shared/authguard.service';
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipeResolverService } from './recipes-resolver.service';
import { NgModule } from '@angular/core';

const routes: Routes = [{
    path: 'recipe', canActivateChild: [AuthguardService], component: RecipesComponent, children: [
        { path: '', component: RecipeStartComponent },
        { path: 'new', component: RecipeEditComponent },
        { path: ':id', component: RecipesDetailComponent, resolve: [RecipeResolverService] },
        { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService] }
    ]
}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipeRoutingModule {
}