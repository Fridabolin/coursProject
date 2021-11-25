import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn: 'root'})

export class RecipeResolverService implements Resolve <Recipe[]> {
  constructor(private dataStorageService: DataStorageService,  private recipeService: RecipeService ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const recipes = this.recipeService.getRecipes()

    if(recipes.length === 0){
      return this.dataStorageService.fetchRecipes()
    } else {
      return recipes;
    }
  }
}

// för att detta ska funka måste vi ha in Resolve{} även i import och vi måste skriva vilken data vi ska lösa
// vilket blir Recipe[] -vår array med recept. då måste vi även hämta den från recipe.model
// injekta dataStorageService i constructorn för det är den som kommer utföra http requesten - måste även importeras


//vi skapar en resolve metod som ger data om routen: ActivatedRouteSnapshot och RouterStateSnapshot (både måste importeras)
// vi behöver inte subscriba här för resloven gör det åt oss
//resolvern kommer hämta recepten åt oss  innen serven är färdig

// för att inte ändra redan existerande recept att lägga en if sats och kolla om det finns recept där.
// injekt recepieService och få tillgång till getRecepe för att kolla längden, är längden
//på receptet noll så går resolvern in annars inte. 
