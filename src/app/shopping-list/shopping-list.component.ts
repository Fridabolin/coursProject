import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients!: Ingredient[];
  private igChangeSub!: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.igChangeSub = this.slService.ingredientsChanged
    .subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      })
  }

  onIngredientsAdded(ingredient: Ingredient){
    this.ingredients.push(ingredient);
  }

  //kopplat till shopping-edit ngOnInit och shopping list-service startedEditing = new Subject <number>();
  onEditItem(index:number){
     this.slService.startedEditing.next(index);
  }

  ngOnDestroy(){
    this.igChangeSub.unsubscribe();
  }
}
