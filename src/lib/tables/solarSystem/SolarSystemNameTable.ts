import {Table} from "../Table";
import {AddTableEntry} from "../AddTableEntry";
import {NonOrNumberOrLetter} from "../galaxy/GalaxyNameTable";
import {RandomNameTable} from "../name/RandomNameTable";
import {SolarSystemDescriptorsTable} from "./SolarSystemDescriptorsTable";

export class SolarSystemNameTable extends Table{
    constructor() {
        super("SolarSystemNames");
        this.entries = [
            new AddTableEntry()
                .addTable(new RandomNameTable())
                .addString(" ")
                .addTable(new SolarSystemDescriptorsTable())
                .addFunction(NonOrNumberOrLetter),
            new AddTableEntry()
                .addTable(new SolarSystemDescriptorsTable())
                .addFunction(NonOrNumberOrLetter),
        ];
    }
}