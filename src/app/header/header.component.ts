import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService){}

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }
}


//onSaveData() kallar vi på vår metod för att spara recept
// som vi gjort i data-storage-service
//för att komma åt den måste vi @injecta den, så med det kan vi skriva
// this.dataStorgaeService.StoreRecipe och lagra våra recept


//onFetchData() kallar på fetchRecipes() i data-storage-service.ts

//on fetch måset vi subscribe'a för att lyssna efter uppdateringar 
