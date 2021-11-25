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
   this.subscription = this.recipeService.recipesChanged // för att lyssna på när receptet ändras. om receptet ändras får jag det i en ny array med recept och sedan uppdaterar vi receptet
    .subscribe (
      (recipes: Recipe[] ) => {
         this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }


  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
