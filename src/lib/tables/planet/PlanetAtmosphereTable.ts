import {Table} from "../Table";

export const PlanetAtmospheres = ["none", "nitrogen-oxygen", "carbon-dioxide", "hydrogen-helium",
    "methane",]

export class PlanetAtmosphereTable extends Table{
    constructor() {
        super("Planet Atmosphere");
        this.ArrayAsTableEntries(PlanetAtmospheres);
    }
}