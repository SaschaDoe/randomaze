import {Character} from "./character/Character";
import {IDGenerator} from "./IDGenerator";

export class Campaign{
    public party: Character[];
    public lastId: number;

    constructor(){
        this.party = [];
        this.lastId = 0;
    }

}