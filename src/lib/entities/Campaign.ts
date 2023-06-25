import type {Character} from "./character/Character";
import type {Culture} from "./culture/Culture";
import type {Galaxy} from "./galaxy/Galaxy";

export class Campaign{
    public party: Character[] = [];
    public cultures: Culture[] = [];
    public lastId: number = 0;
    public galaxies: Galaxy[] = [];
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

export function getEntityTypes(campaign: Campaign): (keyof Campaign)[] {
    return Object.keys(campaign)
        .filter(key => Array.isArray((campaign as any)[key])) as (keyof Campaign)[];
}