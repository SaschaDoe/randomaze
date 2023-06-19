import {Table} from "../Table";
export const DarkPrefixes = ["Dark", "Death", "Dread", "Gloom", "Shadow", "Ruin", "Terror", "Ghoul", "Blight", "Crypt"];

export class PlanetDarkPrefixesTable extends Table{
    constructor() {
        super("Planet Dark Prefixes");
        this.ArrayAsTableEntries(DarkPrefixes);
    }
}