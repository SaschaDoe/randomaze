import {Table} from "../../Table";

export const GermanFemaleFirstnameFirst =  [
    "gut", "sieg", "wald", "ott", "in", "ger", "wal", "ur", "wil", "brun", "il"
];

export class GermanFemaleFirstnameFirstTable extends Table{

    constructor() {
        super("German Female Firstname First");
        this.ArrayAsTableEntries(GermanFemaleFirstnameFirst);
    }

}