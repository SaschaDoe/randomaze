import {Table} from "../../Table";

export const AfricanFemaleNames =  [
    "Abatu", "Akanea", "Aktivi", "Alre-Go", "Alunga", "Amima", "Anakena", "Anekka-Ka", "Ariki", "Asmoa", "Ataranga",
    "Bakiri", "Dasu", "Dawa", "Dpao", "Ekaro", "Esla", "Fekka", "Hahi", "Hoa", "Jaja", "Babumba", "Jemima", "Ka", "Kalu",
    "Kamali", "Katinga", "Khaikhai", "Kiri", "Kohao", "Kptanu", "Kumtami", "Kupe", "Lante", "Lisu", "Lolae", "Lupao",
    "Makkika", "Manisa", "Manui", "Manutara", "Mina-Moa", "Minoma", "Miraro", "Miru", "Muna", "Nahimi", "Nimuh", "Nimou",
    "Niwu", "Nuso-Nu", "Onigo", "Piku", "Pria-Papap", "Rangi", "Rasuli", "Ratan", "Rawiri", "Riro", "Roniga", "Rotang",
    "Safu", "Sama", "Sapa", "Satoh", "Simo", "Simu", "Swiwa", "Taaro", "Tahai", "Tare", "Temura", "Tipo-Tapo", "Totora",
    "Trana", "Uluruh", "Una", "Uriga", "Wela", "Wipati", "Yacar", "Yimari", "Yuta"
];
export class AfricanFemaleNameTable extends Table{
    constructor() {
        super("African Female Names");
        this.ArrayAsTableEntries(AfricanFemaleNames);
    }
}