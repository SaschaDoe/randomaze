import {Table} from "../../Table";
import {AddTableEntry} from "../../AddTableEntry";
import {GermanMaleFirstnameFirstTable} from "./GermanMaleFirstnameFirstTable";
import {GermanMaleFirstnameSecondTable} from "./GermanMaleFirstnameSecondTable";

export class GermanMaleFirstnameTable extends Table{
    constructor() {
        super("German Male Surname");
        this.entries = [
            new AddTableEntry("{German Medieval Male Surname Part 1} + {German Medieval Male Surname Part 2}")
                .addTable(new GermanMaleFirstnameFirstTable())
                .addTable(new GermanMaleFirstnameSecondTable()),
            new AddTableEntry("{German Medieval Male Surname Part 1}")
                .addTable(new GermanMaleFirstnameFirstTable())
        ];

    }

}