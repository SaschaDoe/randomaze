import {Table} from "../../Table";
export const GermanFemaleFirstnameSingle =  [
    "Isle", "Margarethe", "Gretel", "Gretchen", "Gretta",
];

export class GermanFemaleFirstnameSingleTable extends Table{
    constructor() {
        super("German Female Firstname Single");
        this.ArrayAsTableEntries(GermanFemaleFirstnameSingle);
    }

}