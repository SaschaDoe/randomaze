import {Table} from "../Table";

export const PlanetWeathers = ["none", "moderate", "stormy", "foggy"];

export class PlanetWeatherTable extends Table{
    constructor() {
        super("Planet Weather");
        this.ArrayAsTableEntries(PlanetWeathers);
    }
}