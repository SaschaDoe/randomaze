import {Table} from "../../Table";

export const GermanFemaleFirstnameFirst =  [
    "Gut", "Sieg", "Wald", "Ott", "In", "Ger", "Wal", "Ur", "Wil", "Brun"
];

export class GermanFemaleFirstnameFirstTable extends Table{

    constructor() {
        super("German Female Firstname First");
        this.ArrayAsTableEntries(GermanFemaleFirstnameFirst);
    }

}