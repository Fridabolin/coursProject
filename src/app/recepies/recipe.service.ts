import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>(); //Behövs för att onAdd ska funka. den skickar en  tom array

  private recipes:Recipe[] = []; //en tom array med recept så sidan är tom när vi kommer in på den


  constructor(private slService: ShoppingListService) {}

  //gör så vi får tillgång till recepten från utsidan. slice retunerar en exakt kopia.
  getRecipes() {
    return this.recipes.slice();
  }


 // metod som skriver över recept från private recipes:Recipe[] (längre upp). när vi trycker på FetchData
 setRecipes(recipes: Recipe[]){
  this.recipes = recipes;
  this.recipesChanged.next(this.recipes.slice())
 }

  // gör det möjligt för oss att ladda recept via id
  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  // vi tar receptarrayen och .push ett nytt recept på den, sen skickar vi
  //en kopia med .slice()
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  //tar receparrayen tar index elementet som ett argument och sätter det till
  //ett nytt recept. och skickar en kopia med .slice
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  // delete button to onDeliteRecipe
  //gör en kopia minus det recept vi tagit bort
  //skickar kopian till recipesChanged

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
