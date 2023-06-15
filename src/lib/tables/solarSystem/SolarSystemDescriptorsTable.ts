import {Table} from "../Table";

export let SystemSuffixes = [
    "system", "complex", "singularity", "ring", "cluster", "network",
    "conflux", "nebula", "continuum", "web", "lattice", "domain",
    "expanse", "majoris", "triangle", "junction", "quartex", "radius",
    "sphere", "thicket", "network", "vortex", "whirlpool", "xone",
    "yards", "zone", "formation", "dyson sphere", "supercluster", "nexus",
    "galaxy", "universe", "void", "field", "sector", "quadrant",
    "ellipse", "orbit", "pulsar", "quasar", "nebulae", "constellation"
];

export class SolarSystemDescriptorsTable extends Table{
    constructor() {
        super("Solar System Descriptors");
        this.ArrayAsTableEntries(SystemSuffixes);
    }

}