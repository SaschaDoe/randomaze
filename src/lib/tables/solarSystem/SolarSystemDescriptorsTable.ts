import {Table} from "../Table";

export let SystemSuffixes = [
    "system", "complex", "singularity", "cluster", "conflux", "continuum", "lattice", "domain", "realm",
    "expanse", "majoris", "triangle", "junction", "quartex", "radius", "thicket", "network", "vortex",
    "zone", "formation", "nexus", "sector", "quadrant", "ellipse", "orbit", "constellation", "profit", "prime",
    "basis", "foundation", "home", "gathering",
];

export class SolarSystemDescriptorsTable extends Table{
    constructor() {
        super("Solar System Descriptors");
        this.ArrayAsTableEntries(SystemSuffixes);
    }

}