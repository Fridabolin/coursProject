import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recepies',
  templateUrl: './recepies.component.html',
  styleUrls: ['./recepies.component.scss']
})
export class RecepiesComponent implements OnInit {

  selectedRecipe!: Recipe;

  constructor() { }

  ngOnInit(): void {
  }

}
