import { Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})

// Här skapar vi innehållet till vårt receptkort //

export class RecipeListComponent implements OnInit, OnDestroy {
  recipes!: Recipe[] ;
  subscription!: Subscription;

//injecerar vår router.
  constructor(private recipeService: RecipeService,
              private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
   this.subscription = this.recipeService.recipesChanged
    .subscribe (
      (recipes: Recipe[] ) => {
         this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

  //aktiverar "new Recipe" knappen, kopplar den med recipe edit.
  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }


  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
