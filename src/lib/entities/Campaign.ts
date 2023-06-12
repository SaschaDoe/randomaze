import {Character} from "./character/Character";

export class Campaign{
    public party: Character[];
    public lastId: number;

    constructor(){
        this.party = [];
        this.lastId = 0;
    }

}