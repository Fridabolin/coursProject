import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecepiesComponent } from './recepies/recepies.component';
import { RecipeDetailComponent } from './recepies/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recepies/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recepies/recipe-start/recipe-start.component';
import { RecipeResolverService } from './recepies/recipes-resolver-service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';



const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecepiesComponent, children:[
    {path: '', component:RecipeStartComponent },
    {path: 'new' , component: RecipeEditComponent}, 
    {path: ':id',
    component: RecipeDetailComponent,
    resolve:[RecipeResolverService]},
     {path: ':id/edit',
      component: RecipeEditComponent,
      resolve:[RecipeResolverService] }
  ]},
  { path: 'shopping-list' , component:ShoppingListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }


