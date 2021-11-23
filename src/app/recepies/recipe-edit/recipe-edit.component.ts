import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  id!: number;
  editMode = false;

  constructor(private route: ActivatedRoute) { }

  //hämtar id för att kunna avgöra om vi är i edit-mode eller inte
  //21. subscribe till föräldern (recepie)
  //24.här kollar vi om id finns, finns den inte kommer den vara false
  ngOnInit(){
    this.route.params
    .subscribe(
      ( params: Params ) => {
        this.id = +params ['id']
        this.editMode = params ['id'] != null;
    }
    )
  }
}
