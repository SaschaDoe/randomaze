import {Table} from "../../Table";

export const DarkPrefixes = [
    "dark", "death", "dread", "gloom", "shadow", "ruin", "terror", "ghoul", "blight", "crypt", "phantom",
    "vortex", "abyss", "chaos", "doom", "void", "sorrow", "grave", "wraith", "night", "mare", "fear",
    "horror", "hate", "pain", "suffer", "necro",
];

export class PlanetDarkPrefixesTable extends Table{
    constructor() {
        super("Planet Dark Prefixes");
        this.ArrayAsTableEntries(DarkPrefixes);
    }
}
