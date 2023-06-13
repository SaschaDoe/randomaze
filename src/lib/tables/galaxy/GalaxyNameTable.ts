import {Table} from "../Table";
import {AddTableEntry} from "../AddTableEntry";
import {GalaxyDescriptorsTable} from "./GalaxyDescriptorsTable";
import {GalaxyNounsTable} from "./GalaxyNounsTable";
import {ColoursTable} from "../other/ColoursTable";
export class GalaxyNameTable extends Table{
    constructor() {
        super("Galaxy Names");
        this.entries = [
            new AddTableEntry("{Galaxy Descriptors} + {Galaxy Nouns}")
                .addTable(new GalaxyDescriptorsTable())
                .addString(" ")
                .addTable(new GalaxyNounsTable()),
            new AddTableEntry("{Galaxy Nouns}")
                .addTable(new GalaxyNounsTable()),
            new AddTableEntry("{Colours} {Galaxy Nouns}")
                .addTable(new ColoursTable())
                .addString(" ")
                .addTable(new GalaxyNounsTable()),
        ];
    }

}