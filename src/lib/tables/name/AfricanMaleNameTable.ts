import {Table} from "../Table";

export const AfricanMaleNames = [
    "Abioye", "Adisa", "Akintunde", "Akinwande", "Babajide", "Bankole", "Chibuike", "Chijioke", "Chike", "Chima",
    "Chinua", "Chukwuemeka", "Daberechi", "Echezona", "Emeka", "Femi", "Gbenga", "Ifeanyi", "Ikenna", "Jide",
    "Kamau", "Kehinde", "Kofi", "Kwame", "Kwesi", "Lekan", "Nkosi", "Obi", "Ola", "Olumide",
    "Onyekachi", "Onyemachi", "Opeyemi", "Osei", "Osita", "Sekou", "Taiwo", "Tunde", "Uche", "Yao",
    "Zikora", "Zuberi", "Adedeji", "Adewale", "Adisa", "Afolabi", "Akinlabi", "Chidi", "Chijindu", "Chukwudi",
    "Chukwuemeka", "Ekene", "Ifedayo", "Igwe", "Ikechukwu", "Ikemefuna", "Kelechi", "Kwabena", "Kwadwo", "Obinna",
    "Okafor", "Olufemi", "Oluwaseun", "Omotunde", "Onochie", "Orji", "Osahon", "Uchechukwu", "Uchenna", "Uzochi",
    "Uzoma", "Yobachi"
];

export class AfricanMaleNameTable extends Table{
    constructor() {
        super("African Male Names", AfricanMaleNames);

    }
}