import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecepiesComponent } from './recepies/recepies.component';
import { RecipeDetailComponent } from './recepies/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recepies/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recepies/recipe-start/recipe-start.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';


//Navigation, se även i app.module under import och imports.
//9. Vi måste ha pathMatch: ''full när det är en tom väg vi refererar till,
//17. alla barn kommer efter föräldrarna
//19. vi sätter vägen till id (en dynamic parameter) så vi når sidan via id

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecepiesComponent, children:[
    {path: '', component:RecipeStartComponent },
    {path: 'new' , component: RecipeEditComponent}, //måste vara före id, new måset komma före den dynamiska parametern annars vet inte angular om det ska vara "new" eller id
    {path: ':id', component: RecipeDetailComponent},
     {path: ':id/edit', component: RecipeEditComponent}
  ]},
  { path: 'shopping-list' , component:ShoppingListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }


