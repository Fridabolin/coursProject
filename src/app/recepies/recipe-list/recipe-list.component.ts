import { Component, OnInit , EventEmitter, Output } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})

// Här skapar vi innehållet till vårt receptkort //

export class RecipeListComponent implements OnInit {

  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
  new Recipe('A test Recipe',
   'this is simply a test',
   'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=749&q=80' ),
   new Recipe('Another test Recipe',
   'this is simply a test',
   'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=749&q=80' )
];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe){

    this.recipeWasSelected.emit(recipe);

  }
}
