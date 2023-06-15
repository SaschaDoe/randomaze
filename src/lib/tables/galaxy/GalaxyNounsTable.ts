import {Table} from "../Table";
export const GalaxyNouns = ["veil", "lens", "dominion", "empire", "frontier", "kingdom",
    "realm", "dynasty", "nexus", "enclave", "quandary", "dawn", "sovereignty", "refuge", "haven", "sanctuary",
    "sanctuary", "expanse", "ascendancy", "freedom", "calling", "solitude", "horizon", "lair", "fire", "forge",
    "fate", "deep", "cluster", "end", "gain", "group"];


export class GalaxyNounsTable extends Table{
    constructor() {
        super("Galaxy Nouns");
        this.ArrayAsTableEntries(GalaxyNouns);
    }

}