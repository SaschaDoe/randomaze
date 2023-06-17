import {Table} from "../Table";

export const PlanetTypes = [
    "desert", "ice", "djungle", "earth like", "gas giant", "puffy", "lava", "ocean", "rocky", "volcanic",
];
export class PlanetTypeTable extends Table{
    constructor() {
        super("Planet Types");
        this.ArrayAsTableEntries(PlanetTypes);
    }

}