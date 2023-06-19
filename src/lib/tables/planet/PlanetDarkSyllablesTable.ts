import {Table} from "../Table";

export const Syllables = [
    "ul", "thra", "cer", "can", "cri", "bel", "pha", "ter", "nec", "pros",
    "tar", "vol", "gra", "stron", "agri", "pol", "mac", "cad", "ian", "ver",
    "tyr", "ris", "qua", "pra", "gen", "soli", "phae", "tus", "lus", "ist",
    "nox", "urn", "vex", "tor", "ra", "tel", "ius", "fer", "rox", "omni", "ex",
    "gore", "malign", "mort", "skull", "grim", "void", "dread", "fear", "obsidian"
];

export class PlanetDarkSyllablesTable extends Table{
    constructor() {
        super("Dark Planet Syllables");
        this.ArrayAsTableEntries(Syllables);
    }
}