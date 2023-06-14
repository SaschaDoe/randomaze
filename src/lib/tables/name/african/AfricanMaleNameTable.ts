import {Table} from "../../Table";

export const AfricanMaleNames = [
    "abioye", "adisa", "akintunde", "akinwande", "babajide", "bankole", "chibuike", "chijioke", "chike", "chima",
    "chinua", "chukwuemeka", "daberechi", "echezona", "emeka", "femi", "gbenga", "ifeanyi", "ikenna", "jide",
    "kamau", "kehinde", "kofi", "kwame", "kwesi", "lekan", "nkosi", "obi", "ola", "olumide",
    "onyekachi", "onyemachi", "opeyemi", "osei", "osita", "sekou", "taiwo", "tunde", "uche", "yao",
    "zikora", "zuberi", "adedeji", "adewale", "adisa", "afolabi", "akinlabi", "chidi", "chijindu", "chukwudi",
    "chukwuemeka", "ekene", "ifedayo", "igwe", "ikechukwu", "ikemefuna", "kelechi", "kwabena", "kwadwo", "obinna",
    "okafor", "olufemi", "oluwaseun", "omotunde", "onochie", "orji", "osahon", "uchechukwu", "uchenna", "uzochi",
    "uzoma", "yobachi"
];

export class AfricanMaleNameTable extends Table{
    constructor() {
        super("African Male Names");
        this.ArrayAsTableEntries(AfricanMaleNames);

    }
}