import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {map, tap} from "rxjs/operators"
import { RecipeService } from "../recepies/recipe.service";
import { Recipe } from "../recepies/recipe.model";


@Injectable({providedIn: 'root'})

export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes(){
    const recipes = this.recipeService.getRecipes()

    this.http.put
    ('https://ng-course-recipe-book-3a701-default-rtdb.firebaseio.com/recepies.json',
     recipes
     )
     .subscribe(response =>{
      console.log(response)
    });
  }

  // <Recipe[]> måste vi ha för att tala om för angular att recipe är av array, då måste även Recipe importeras import {Recipe}
  fetchRecipes(){
    return this.http
    .get<Recipe[]>(
      'https://ng-course-recipe-book-3a701-default-rtdb.firebaseio.com/recepies.json',
      )
    .pipe(
      map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
           ingredients: recipe.ingredients ? recipe.ingredients: []
          };
      });
    }),
    tap(recipes => {
      this.recipeService.setRecipes(recipes)
    })
    );
  }
}

//Notes//

//-----------för att http och firebase ska fungera-------------//

// @Injectable() för att vi ska injekta en service till en service

//DataStorageService kan läggas in i app.module men här använder vi {provideIn:'root'} i @Injectable

//Viktigt importa HttpClientModule i app.module, gör vi inte det kan vi inte använda oss av funktionalliteten

//  constructor(private http: HttpClient, private recipeService: RecipeService) gör
//att vi kan lagra recepten


//--------------Store Recipes -------------------//

//för att spara recepten skapar vi metoden storeRecipes() i den metoden gör vi en injekt till recipe.service så att vi kan ladda det
//nyaste/nuvarande recept

// I constructorn injectar vi RecipeService - så med det gjort når vi vårt recept genom this.recipeService.getRecipes

//Vi vill lagra alla recept och skriva över det vi lagrat innan så därför använder vi oss av put() som kommer skriva över tidigare sparad data

//du måste skriva med recipes.json. json vill firebase att du har med, inte angular
//.recipes ska du skriva för att  det blir till "nodes" som firebase gör om till filer
//med lagrad data

// för att säga till angular vad som ska finnas i put() använder vi subscribe för att "följa/prenumerera på recipe" och lägger
//även en response.


//----------- FetchRecipes--------------//

//triggas av onFetchData i header.html & header.ts

//med samma url gör vi istället en get() request för att få recepten vi lagrat genom storeRecipe()

//För att sedan kunna skriva över informationen som redan var lagrad görs en metod
//i recipe.service.ts

//SetRecipes i recipe.service.ts gör vi :
// vi hämtar vår array med recept (recipes: Recipe[])
// sedan säger vi att recipe ska bli de recipe vi får tillbaka som ett argument
//detta kommer skriva över private recipes:Recipe[] = []; längre upp i recipe.service
// med det måste vi kalla på recipesChanged och lägga till en kopia av det recept vi nyss skaffade.


// vi vill lägga in en tom array med ingredienser för att förhindra eventuella error
// .pipe(
//   map(recipes => {
//   return recipes.map(recipe => {
//     return {
//       ...recipe,
//        ingredients: recipe.ingredients ? recipe.ingredients: []
//       };
//   });
// }),
// tap(recipes => {

//precis före vi hämtar receptet lägger vi pipe och map, map gör om datan vi får
// från http med hjälp av pipe (map måste vi importera längst upp) map ihop med pipe
//är en rxj operator, map längre ner är map som gör om arrayer

//vi får tillbaka recipe och lägger map(), sedan retunerar vi recipe och använder
// spred operatorn för att kopiera allt från recepie och ifall den inte innhåller några ingrediencer
// skickar vi en tom array med ingredienser tillbaka, annars ändras inget.



//vi använder oss av en resolver som laddas före en rout är laddad för att
//data som routern är beroende av finns där - se resepive.resolver.service.ts

// tap() (rxj operator) tap låter oss utföra kod utan att förändra något
