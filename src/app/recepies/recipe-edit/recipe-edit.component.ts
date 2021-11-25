import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  id!: number;
  editMode = false;
  recipeForm!: FormGroup; // FormGroup måste importas och måste läggas in i app.module

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router:Router)
     {}

  //hämtar id för att kunna avgöra om vi är i edit-mode eller inte
  //21. subscribe till föräldern (recepie)
  //24.här kollar vi om id finns, finns den inte kommer den vara false
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    }
    );
  }

  //Spara informationen i vår receptarray eller uppdatera existerande
  //vi kollar om vi är i editmode, är vi det kallar vi på updateRecipe() vi skickar in id på det receptet vi
  //jobbar på och sedan det nya receptet
  //else - om vi inte är i edit mode kallar vi på recepieService och addRecipe metoden och skickar in vårt nya recept
  //för att detta ska funka behövs recipesChanged = new Subject<Recipe[]>(); i recipe.service.ts
  onSubmit() {

    if (this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    } else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  //skaffar acces till recipeForm och ingredienserna, för att angular ska veta
  //att det är en array måste vi "casta den" <FormArraray> och (), allt mellan paranteserna är av array
  //vi vill pusha en ny formgroup - alltså våra inputfält och knapp i satt formgroup på.
  onAddIngredient(){
    (<FormArray> this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name' : new FormControl(null, Validators.required),
        'amount' : new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ] )
      })
    )
  }


  // The clear() method automatically loops through all registered FormControls (or FormGroups) in the FormArray and removes them.

//hämtar index som blir den groupcontrol vi vill ta bort
// hämtar acces till ingrediens arrayen med get
  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

// behöver importa Router. vi behöver säga till angular vår nuvarande route (det gör vi i constructorn)

  onCancel(){
    this.router.navigate(['../'], {relativeTo:this.route})
  }


  //formvalidering
  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description

      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    // sätt inte required med () - du vill bara skicka en referens så angular kan utföra metoden när det förväntas//
    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName, Validators.required),
      'imagePath' : new FormControl(recipeImagePath, Validators.required),
      'description' : new FormControl(recipeDescription, Validators.required),
      'ingredients' : recipeIngredients
    });
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

}





//private initForm

//import FormGroup
//vi når receptet genom att injecta RecipeService samt importerar

//vi gör variablar som vi sedan kopplar till en if sats

// let recipeName = '';
// let recipeImagePath = '';
// let recipeDescription = '';
// let recipeIngredients = new FormArray([]);

//sen gör vi logik som säger hur det ska se ut i editmode

//vi har hämtat id längre upp så med det och recipeService kommer vi åt receptet och kan säga
// att
