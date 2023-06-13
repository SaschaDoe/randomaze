import {Table} from "../Table";
export const GalaxyDescriptors = ["nebula's", "shattered", "star", "celestial", "astral", "quantum", "galactic",
    "stellar", "cosmic", "vortex", "pulsar", "eclipse", "nova", "starlight", "quasar", "phoenix", "singularity",
    "supernova", "etherium", "ascendancy", "ancient", "dark", "far-off", "distant", "unknown", "uncharted",]

export class GalaxyDescriptorsTable extends Table{
    constructor() {
        super("Galaxy Descriptors");
        this.ArrayAsTableEntries(GalaxyDescriptors);
    }

}