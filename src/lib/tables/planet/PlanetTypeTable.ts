import {Table} from "../Table";
import {PlanetLivableTypes} from "./PlanetTypeLivableTable";
import {PlanetNonLivableTypes} from "./PlanetTypeNonLivableTable";

// function to get enum values as an array
function enumValues(e: any) {
    return Object.values(e);
}

const PlanetTypes = [
    ...new Set([
        ...enumValues(PlanetLivableTypes),
        ...enumValues(PlanetNonLivableTypes),
    ]),
];

export class PlanetTypeTable extends Table {
    constructor() {
        super("Planet Types");
        this.EnumAsTableEntries(PlanetTypes);
    }
}