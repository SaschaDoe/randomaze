import {Table} from "../Table";

export const PlanetTypes = [
    "desert", "ice", "jungle", "earthlike", "gasgiant", "puffy", "lava", "ocean", "rocky",
];

export class PlanetTypeTable extends Table{
    constructor() {
        super("Planet Types");
        this.ArrayAsTableEntries(PlanetTypes);
    }

}