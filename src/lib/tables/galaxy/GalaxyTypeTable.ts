import {Table} from "../Table";
export const GalaxyTypes = [
    "spiral", "nebular", "anomaly",
];
export class GalaxyTypeTable extends Table{
    constructor() {
        super("Galaxy Types");
        this.ArrayAsTableEntries(GalaxyTypes);
    }

}