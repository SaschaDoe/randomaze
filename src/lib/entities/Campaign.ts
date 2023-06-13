import {Character} from "./character/Character";
import {Culture} from "./culture/Culture";

export class Campaign{
    public party: Character[];
    public cultures: Culture[];
    public lastId: number;

    constructor(){
        this.party = [];
        this.cultures = [];
        this.lastId = 0;
    }

}