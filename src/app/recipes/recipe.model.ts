import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
    public name: string;
    public description: string;
    public imageUrl: string;
    public ingredients: Ingredient[];
    constructor(name: string, desc: string, image: string, ingredients: Ingredient[]) {
        this.name = name;
        this.description = desc;
        this.imageUrl = image;
        this.ingredients = ingredients;
    }
}
