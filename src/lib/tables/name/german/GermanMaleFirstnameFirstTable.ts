import {Table} from "../../Table";


export const GermanMaleSurnameFirst =  [
    "Adal", "Adel", "Alar", "Alber", "Ald", "Amal", "Ansel", "Armin", "Diet", "Eck", "Eber",
    "Egil", "Erman", "Fried", "Ger", "Gisel", "Godt", "Gunther", "Hein", "Her",
    "Hugo", "Karl", "Konrad", "Land", "Leo", "Lud", "Os", "Rein", "Rich", "Rud",
    "Ulf", "Volk", "Walter", "Wil", "Win", "Wolf", "Wulf", "Zwin", "Al", "Arn", "Bald", "Bert",
    "Egin", "Engel", "Irmin", "Lamb", "Mein", "Nor", "Rainer", "Rud", "Sig", "Sieg", "Ott",
];

export class GermanMaleFirstnameFirstTable extends Table{

    constructor() {
        super("German Male Surname First");
        this.ArrayAsTableEntries(GermanMaleSurnameFirst);
    }

}