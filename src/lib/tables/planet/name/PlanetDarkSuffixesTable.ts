import {Table} from "../../Table";

export const suffixes = ["pire", "heim", "hold", "gate", "world", "bane", "fang", "mourn", "gast", "reap", "fall",
    "wail", "scream", "cry", "sigh", "moan", "soul", "shade", "doom",];

export class PlanetDarkSuffixesTable extends Table{
    constructor() {
        super("Planet Dark Suffixes");
        this.ArrayAsTableEntries(suffixes);
    }
}