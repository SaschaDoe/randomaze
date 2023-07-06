import {Table} from "../Table";

export enum PlanetNonLivableTypes {
    LETHALICE = "lethalice",
    LETHALROCKY = "lethalrocky",
    GASGIANT = "gasgiant",
    PUFFY = "puffy",
    LAVA = "lava",
}

export class PlanetTypeNonLivableTable extends Table {
    constructor() {
        super("Non-livable Planet Types");
        this.EnumAsTableEntries(PlanetNonLivableTypes);
    }
}