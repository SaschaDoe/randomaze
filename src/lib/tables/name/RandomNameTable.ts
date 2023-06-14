import {Table} from "../Table";
import {AddTableEntry} from "../AddTableEntry";
import {GermanMaleFirstnameTable} from "./german/GermanMaleFirstnameTable";
import {GermanFemaleFirstnameTable} from "./german/GermanFemaleFirstnameTable";
import {AfricanMaleNameTable} from "./african/AfricanMaleNameTable";
import {AfricanFemaleNameTable} from "./african/AfricanFemaleNameTable";

export class RandomNameTable extends Table{
    constructor() {
        super("Random Name");
        this.entries = [
            new AddTableEntry("{German Male Firstname Table}")
                .addTable(new GermanMaleFirstnameTable()),
            new AddTableEntry("{German Female Firstname Table}")
                .addTable(new GermanFemaleFirstnameTable()),
            new AddTableEntry("{African Male Firstname Table}")
                .addTable(new AfricanMaleNameTable()),
            new AddTableEntry("{African Female Firstname Table}")
                .addTable(new AfricanFemaleNameTable()),
        ];

    }

}