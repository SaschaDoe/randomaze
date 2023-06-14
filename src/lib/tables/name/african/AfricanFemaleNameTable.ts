import {Table} from "../../Table";

export const AfricanFemaleNames = [
    "abatu", "akanea", "aktiv", "alre-go", "alunga", "amima", "anakena", "anekka-ka", "ariki", "asmoa", "ataranga",
    "bakiri", "dasu", "dawa", "dpao", "ekaro", "esla", "fekka", "hahi", "hoa", "jaja", "babumba", "jemima", "ka", "kalu",
    "kamali", "katinga", "khaikhai", "kiri", "kohao", "kptanu", "kumtami", "kupe", "lante", "lisu", "lolae", "lupao",
    "makkika", "manisa", "manui", "manutara", "mina-moa", "minoma", "miraro", "miru", "muna", "nahimi", "nimuh", "nimou",
    "niwu", "nuso-nu", "onigo", "piku", "pria-papap", "rangi", "rasuli", "ratan", "rawiri", "riro", "roniga", "rotang",
    "safu", "sama", "sapa", "satoh", "simo", "simu", "swiwa", "taaro", "tahai", "tare", "temura", "tipo-tapo", "totora",
    "trana", "uluruh", "una", "uriga", "wela", "wipati", "yacar", "yimari", "yuta"
];
export class AfricanFemaleNameTable extends Table{
    constructor() {
        super("African Female Names");
        this.ArrayAsTableEntries(AfricanFemaleNames);
    }
}