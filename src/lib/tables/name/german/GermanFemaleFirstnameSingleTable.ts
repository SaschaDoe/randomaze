import {Table} from "../../Table";
export const GermanFemaleFirstnameSingle =  [
    "isle", "margarethe", "gretel", "gretchen", "gretta",
];

export class GermanFemaleFirstnameSingleTable extends Table{
    constructor() {
        super("German Female Firstname Single");
        this.ArrayAsTableEntries(GermanFemaleFirstnameSingle);
    }

}