import {PlanetNameGenerator} from "../../entities/planet/PlanetNameGenerator";
import {Table} from "../Table";
import {AddTableEntry} from "../AddTableEntry";

export function getDarkPlanetName(): string{
    return PlanetNameGenerator.generateDarkName().getName();
}
export class PlanetNameDarkTable extends Table{
    constructor() {
        super("Dark Planet Names");
        this.entries = [
            new AddTableEntry()
                .addFunction(getDarkPlanetName)
        ];
    }
}