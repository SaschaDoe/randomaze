import {Table} from "../Table";

export let CultureNames = [
    "african", "german"
];

export class CultureNameTable extends Table{

    constructor() {
        super("Culture Names");
        this.ArrayAsTableEntries(CultureNames);
    }
}