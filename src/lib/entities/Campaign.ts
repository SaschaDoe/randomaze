import {Character} from "./character/Character";
import {Culture} from "./culture/Culture";
import {Galaxy} from "./galaxy/Galaxy";

export class Campaign{
    public party: Character[];
    public cultures: Culture[];
    public lastId: number;
    public galaxies: Galaxy[];

    constructor(){
        this.party = [];
        this.cultures = [];
        this.galaxies = [];
        this.lastId = 0;
    }

}