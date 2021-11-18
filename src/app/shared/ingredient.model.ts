export class Ingredient {

    public name: string;
    public amount: number;

    constructor( name: string , amount: number){
        this.name= name;
        this.amount= amount;
    }
}

// vi hade även kunnat skriva constructor(public name: string, public amount: number){}
// i export class ingredient {}
