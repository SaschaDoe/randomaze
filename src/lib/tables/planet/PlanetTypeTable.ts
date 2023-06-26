import {Table} from "../Table";
import {PlanetLivableTypes} from "./PlanetTypeLivableTable";
import {PlanetTNonLivableTypes} from "./PlanetTypeNonLivableTable";

const PlanetTypes = [
    ...new Set([
        ...PlanetLivableTypes,
        ...PlanetTNonLivableTypes,
    ]),
];

export class PlanetTypeTable extends Table{
    constructor() {
        super("Planet Types");
        this.ArrayAsTableEntries(PlanetTypes);
    }

}