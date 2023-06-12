import {Table} from "../../Table";

export const GermanFemaleFirstnameSecond =  [
    "da", "run", "traud", "hild", "hilda", "gund", "grid", "sula", "friede", "frieda", "helmina"
];

export class GermanFemaleFirstnameSecondTable extends Table{

    constructor() {
        super("German Female Firstname Second");
        this.ArrayAsTableEntries(GermanFemaleFirstnameSecond);
    }

}