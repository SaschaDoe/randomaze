import {Entity} from "../Entity";

export class Culture extends Entity{
    public name: string;
    constructor(name: string) {
        super();
        this.name = name;
    }
}