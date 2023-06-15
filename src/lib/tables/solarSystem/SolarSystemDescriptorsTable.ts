import {Table} from "../Table";

export let SystemSuffixes = [
    "system", "complex", "singularity", "cluster", "conflux", "continuum", "web", "lattice", "domain",
    "expanse", "majoris", "triangle", "junction", "quartex", "radius", "thicket", "network", "vortex", "whirlpool",
    "xone", "yards", "zone", "formation", "nexus", "galaxy", "universe", "field", "sector", "quadrant",
    "ellipse", "orbit", "constellation"
];

export class SolarSystemDescriptorsTable extends Table{
    constructor() {
        super("Solar System Descriptors");
        this.ArrayAsTableEntries(SystemSuffixes);
    }

}