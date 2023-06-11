import {Entry} from "../Entry";
import {Table} from "../Table";

export let CultureNames = [
    "african",
];

export class CultureNameTable extends Table{

    constructor() {
        super("Culture Names");
        for(let i = 0; i < CultureNames.length; i++){
            let entry = new Entry(CultureNames[i]);
            this.entries.push(entry);
        }
    }
}