import {Table} from "../Table";
import {AddTableEntry} from "../AddTableEntry";
import {PlanetNameGenerator} from "../../entities/planet/PlanetNameGenerator";

export function getPlanetName(): string{
    return PlanetNameGenerator.generate().getFull();
}
export class PlanetNameTable extends Table{
    constructor() {
        super("Planet Names");
        this.entries = [
            new AddTableEntry()
                .addFunction(getPlanetName)
        ];
    }
}