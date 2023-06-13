import {Table} from "../Table";
export const GalaxyTypes = [
    "spiral", "nebular", "irregular", "ecliptic"
];
export class GalaxyTypeTable extends Table{
    constructor() {
        super("Galaxy Types");
        this.ArrayAsTableEntries(GalaxyTypes);
    }

}