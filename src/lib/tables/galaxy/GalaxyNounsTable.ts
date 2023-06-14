import {Table} from "../Table";
export const GalaxyNouns = ["veil", "lens", "dominion", "empire", "expanse", "frontier", "halo", "kingdom",
    "realm", "dynasty", "nexus", "enclave", "quandary", "dawn", "sovereignty", "refuge", "haven", "sanctuary",
    "sanctuary", "expanse", "ascendancy", "freedom", "calling", "solitude", "horizon", "lair", "fire", "forge",
    "fate", "deep", "cluster", "nebula", "end", "Gain", "sector", "group"];


export class GalaxyNounsTable extends Table{
    constructor() {
        super("Galaxy Nouns");
        this.ArrayAsTableEntries(GalaxyNouns);
    }

}