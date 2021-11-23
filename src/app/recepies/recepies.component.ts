import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recepies',
  templateUrl: './recepies.component.html',
  styleUrls: ['./recepies.component.scss'],
  providers: [RecipeService]
})
export class RecepiesComponent implements OnInit {


  constructor() { }

  ngOnInit(){
  }

}
