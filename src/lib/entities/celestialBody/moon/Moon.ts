import {Entity} from "../../Entity";

export class Moon extends Entity{
    public name: string = "";
    public size: string = "";
    public nameTranslation: string = "";
    public nameMeaning: string = "";

    public orbitRadius: number = 0;
    distance: number = 0;

    constructor(){
        super();

    }
}