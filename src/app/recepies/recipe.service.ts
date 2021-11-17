import { EventEmitter, Injectable } from "@angular/core";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model"
import { Ingredient } from "../shared/ingredient.model";


@Injectable()
export class RecipeService{
  recipeSelected = new EventEmitter <Recipe>();

  private recipes: Recipe[] = [
  new Recipe(
  'Tasty schnitzel',
  'this is simply a test',
  'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=749&q=80',
  [
     new Ingredient('Meat', 1),
     new Ingredient('French Fries', 20)
  ],),

  new Recipe(
    'Big fat burger',
    'this is simply a test',
    'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=749&q=80',
    [
      new Ingredient('Buns', 2),
     new Ingredient('Meat', 1)
    ],)
];

constructor(private slService:ShoppingListService){}

getRecipes(){
  return this.recipes.slice();
}

addIngredientsToShoppingList(ingredients: Ingredient[]){
this.slService.addIngredients(ingredients);
}
}
