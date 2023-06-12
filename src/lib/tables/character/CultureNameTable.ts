import {Table} from "../Table";

export let CultureNames = [
    "african",
];

export class CultureNameTable extends Table{

    constructor() {
        super("Culture Names", CultureNames);
    }
}