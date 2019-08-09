export class Recipe {
    public name: string;
    public description: string;
    public imageUrl: string;
    constructor(name, desc, image) {
        this.name = name;
        this.description = desc;
        this.imageUrl = image;
    }
}
