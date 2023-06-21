import {Character} from "./character/Character";
import {Culture} from "./culture/Culture";
import {Galaxy} from "./galaxy/Galaxy";

export class Campaign{
    public party: Character[];
    public cultures: Culture[];
    public lastId: number;
    public galaxies: Galaxy[];
    constructor(){
        this.reset();
    }

    public reset(){
        this.party = [];
        this.cultures = [];
        this.galaxies = [];
        this.lastId = 0;
    }


}

export function getEntityTypes(campaign: Campaign){
    return Object.keys(campaign)
        .filter(key => Array.isArray(campaign[key]));
}