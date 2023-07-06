
import {Table} from "../Table";

export enum PlanetLivableTypes {
    DESERT = "desert",
    ICE = "ice",
    JUNGLE = "jungle",
    EARTHLIKE = "earthlike",
    OCEAN = "ocean",
    ROCKY = "rocky",
}

export class PlanetTypeLivableTable extends Table {
    constructor() {
        super("Livable Planet Types");
        this.EnumAsTableEntries(PlanetLivableTypes);
    }
}
