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


  getRecipes() {
    return this.recipes.slice();
  }


 // metod som skriver över recept från private recipes:Recipe[] (längre upp). när vi trycker på FetchData
 setRecipes(recipes: Recipe[]){
  this.recipes = recipes;
  this.recipesChanged.next(this.recipes.slice())
 }


  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  //uppdaterar hela receptet
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  //uppdaterar bara ingrediensen
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  // hör ihop med onDeliteRecipe 
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
