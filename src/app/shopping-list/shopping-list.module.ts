import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CanDeactivateGuard } from './shopping-edit/can-deactivate-guard';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        RouterModule.forChild([
            { path: 'shop', canDeactivate: [CanDeactivateGuard], component: ShoppingListComponent }
        ])
       
    ]
})
export class ShoppingListModule { }