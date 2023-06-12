import {Table} from "./Table";
import {Entry} from "./Entry";

export class SingleRoll{
    public table: Table;
    public entry: Entry;
    constructor(table: Table, entry: Entry) {
        this.table = table;
        this.entry = entry;
    }

    getRolledIndex() {
        return this.table.entries.indexOf(this.entry);
    }
}