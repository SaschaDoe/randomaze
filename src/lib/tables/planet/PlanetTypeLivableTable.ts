import {Table} from "../Table";

export const PlanetLivableTypes = [
    "desert", "ice", "jungle", "earthlike", "ocean", "rocky",
];

export class PlanetTypeLivableTable extends Table{
    constructor() {
        super("Livable Planet Types");
        this.ArrayAsTableEntries(PlanetLivableTypes);
    }

}