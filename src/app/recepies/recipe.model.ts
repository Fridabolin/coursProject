

// vi har skapat en model där vi ska skriva en blueprint/class för 
// hur vår lista för recipes ska se ut


export class Recipe {
    public name: string; 
    public description: string;
    public imagePath: string; 

    constructor(name:string, desc: string, imagePath: string){
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
    }
}
