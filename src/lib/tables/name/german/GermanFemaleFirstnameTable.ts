import {Table} from "../../Table";
import {AddTableEntry} from "../../AddTableEntry";
import {GermanFemaleFirstnameSecondTable} from "./GermanFemaleFirstnameSecondTable";
import {GermanFemaleFirstnameFirstTable} from "./GermanFemaleFirstnameFirstTable";
import {DisplayedTextEntry} from "../../DisplayedTextEntry";
import {GermanFemaleFirstnameSingleTable} from "./GermanFemaleFirstnameSingleTable";

export class GermanFemaleFirstnameTable extends Table {
    constructor() {
        super("German Female Firstname");
        this.entries = [
            new AddTableEntry("{German Female Firstname Part 1} + {German Female Firstname Part 2}")
                .addTable(new GermanFemaleFirstnameFirstTable())
                .addTable(new GermanFemaleFirstnameSecondTable()),
            new AddTableEntry("{German Female Firstname Part 1}")
                .addTable(new GermanFemaleFirstnameSingleTable())
        ];

    }
}
