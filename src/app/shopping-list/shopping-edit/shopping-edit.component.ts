
import { Component,
   OnDestroy,
   OnInit,
   ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm! : NgForm //för att komma åt vår lokala referens i shopping-edit.html
  subscription!: Subscription //lagrar vår subscripiton om det skulle förstöras.
  editMode = false; //så att appen ska veta när vi är i editMode
  editedItemIndex!: number;
  editedItem!: Ingredient; // vi lagrar resultatet av vår nya metod i Ingredient

  constructor(private slService: ShoppingListService) { }

  //lagrar vår subscription från startedEditing. den här metoden gör så att vi kan
  //välja en ingrediens och den kommer till name och amount så vi kan redigera den
  ngOnInit(){
   this.subscription = this.slService.startedEditing
    .subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        })
      }
    );
  }

  // vi hämtar acces till formuläret
  // om vi är i editmode så vill vi inte lägga till en ny ingrediens utan istället redigera vår ingrediens
  //med updateIngredient
  //annars kallar vi på addIngredient
  onSubmit
  (form:NgForm){
    const value = form.value;
    const newIngredient = new Ingredient( value.name, value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex,newIngredient);
    } else{
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  //genom @viewchild har vi acces till formuläret, så med reset() tömmer vi inputfälten
  //editmode sätts till false så add kommer upp igen
  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }

  //kopplat till deleteIngredient i shopping-list.service.ts. vi kallar på deleteIngredient och skickar med vår editedItemIndex och sedan
  //onClear för att rensa inputfälten och återställa add knappen 
  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear()
  }

  //för att rensa upp vår subescription längre upp
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
