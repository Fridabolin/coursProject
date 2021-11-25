import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
 @Input() recipe!: Recipe; //gör så vi når recipe från utsidan 
 @Input() index!: number; //kommer göra att vi kan nå index/Recipe från utsidan

  ngOnInit() {
  }


}
