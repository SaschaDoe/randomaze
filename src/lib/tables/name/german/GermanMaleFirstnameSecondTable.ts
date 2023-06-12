import {Table} from "../../Table";

export const GermanMaleSurnameSecond =  [
    "bald", "bert", "eck", "gott", "hein", "mann", "rad", "land", "wig", "eck", "hard",
    "wald", "rich", "rich", "volk", "win", "wolf", "hard", "ric", "hard", "hold", "ulf",
    "drad", "le", "la",
];

export class GermanMaleFirstnameSecondTable extends Table{

    constructor() {
        super("German Male Surname Second");
        this.ArrayAsTableEntries(GermanMaleSurnameSecond);
    }

}