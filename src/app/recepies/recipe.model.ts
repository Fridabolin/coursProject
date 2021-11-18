

// vi har skapat en model där vi ska skriva en blueprint/class för
// hur vår lista för recipes ska se ut

import { Ingredient } from "../shared/ingredient.model";


export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient [];


    constructor(name:string, desc: string, imagePath: string, ingredients: Ingredient[]){
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
}
