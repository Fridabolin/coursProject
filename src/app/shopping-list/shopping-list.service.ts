

import { i18nMetaToJSDoc } from "@angular/compiler/src/render3/view/i18n/meta";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject <number>(); // för att kunna lyssna på i shopping.edit.component

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes',10),
  ];

  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredient(index:number){
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient){
   this.ingredients.push(ingredient);
   this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients:Ingredient[]){
  //  for (let ingredient of ingredients){
  //    this.addIngredient(ingredient);
  //  }
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  //vi hämtar index av den ingrediens som ska bli uppdaterad och sätter det till en ny
  //ingrediens sen kallar vi på ingredientsChange och skickar in vår uppdaterade ingrediens
  updateIngredient(index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  //med index får jag rätt  ingrediens att radera, splice retunerar en kopia efter att
  //ett index är borttaget.
  //sen kallar vi på ingredietsChangede och skickar vår nya kopia. 
  deleteIngredient(index: number){
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice())
  }



}
