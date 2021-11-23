import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})


//2 & 24 för att hämta id måste vi ha acess till route
//30 subscribe reagerar för förändring i föräldern och vi hämtar dom med params
//32 vi sätter + framför params för att göra om id från sträng till nummer



export class RecipeDetailComponent implements OnInit {

 recipe!: Recipe;
 id!:number;


  constructor(private recipeService: RecipeService,
             private route: ActivatedRoute,
          private router:Router) { }

  //34.här sätter vi subscribe och params för att reagera och hämta förändringar,
  //35. vi använder oss av id för att kunna identifiera receptet
  //36. hämtar receptet

  ngOnInit() {
    this.route.params
    .subscribe((params: Params) => {
      this.id= +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    }
  )
  }

  //Lägger till ingredienser till shoppinglistan
  onAddToShoppingList() {
   this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  //Kopplar edit-recipe länken i Manage recipe dropdown till recipe-edit template.
  onEditRecipe(){
    this.router.navigate(['edit'] , {relativeTo: this.route})
  }
}
