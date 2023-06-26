import {Table} from "../Table";

export const PlanetTNonLivableTypes = [
    "lethalice", "lethalrocky", "gasgiant", "puffy", "lava",
];

export class PlanetTypeNonLivableTable extends Table{
    constructor() {
        super("Non-livable Planet Types");
        this.ArrayAsTableEntries(PlanetTNonLivableTypes);
    }

}