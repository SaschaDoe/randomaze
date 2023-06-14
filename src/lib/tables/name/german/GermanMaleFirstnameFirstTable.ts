import {Table} from "../../Table";


export const GermanMaleSurnameFirst =  [
    "adal", "adel", "alar", "alber", "ald", "amal", "ansel", "armin", "diet", "eck", "eber",
    "egil", "erman", "fried", "ger", "gisel", "godt", "gunther", "hein", "her",
    "hugo", "karl", "konrad", "land", "leo", "lud", "os", "rein", "rich", "rud",
    "ulf", "volk", "walter", "wil", "win", "wolf", "wulf", "zwin", "al", "arn", "bald", "bert",
    "egin", "engel", "irmin", "lamb", "mein", "nor", "rainer", "rud", "sig", "sieg", "ott",
];

export class GermanMaleFirstnameFirstTable extends Table{

    constructor() {
        super("German Male Surname First");
        this.ArrayAsTableEntries(GermanMaleSurnameFirst);
    }

}