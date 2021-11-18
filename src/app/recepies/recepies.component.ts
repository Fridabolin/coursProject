import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recepies',
  templateUrl: './recepies.component.html',
  styleUrls: ['./recepies.component.scss'],
  providers: [RecipeService]
})
export class RecepiesComponent implements OnInit {

  selectedRecipe!: Recipe;

  constructor(private recipeService:RecipeService) { }

  ngOnInit(){
    this.recipeService.recipeSelected
    .subscribe(
      (recipe:Recipe) =>{
        this.selectedRecipe = recipe;
      }
    );
  }

}


//9. Providers When you add a service provider to the root application injector,
//  it’s available throughout the application. Additionally,
//  these providers are also available to all the classes in
//  the application as long they have the lookup token.
