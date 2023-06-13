import {Table} from "../Table";
export const GalaxyNouns = ["veil", "lens", "dominion", "empire", "expanse", "frontier", "halo", "kingdom",
    "realm", "dynasty", "federation", "nexus", "enclave", "quandary", "dawn", "sovereignty",
    "sanctuary", "expanse", "ascendancy", "freedom", "calling", "solitude", "horizon", "lair", "fire", "forge",
    "fate", "deep", "cluster", "nebula"];


export class GalaxyNounsTable extends Table{
    constructor() {
        super("Galaxy Nouns");
        this.ArrayAsTableEntries(GalaxyNouns);
    }

}