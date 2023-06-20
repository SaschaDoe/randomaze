import {Table} from "../Table";
export let Prefixes = [
    { prefix: 'ال', transliteration: "al", meaning: 'the', language: 'Arabic' },
    { prefix: 'أ', transliteration: "a", meaning: 'question marker', language: 'Arabic' },
    { prefix: 'ب', transliteration: "b", meaning: 'with, by', language: 'Arabic' },
    { prefix: 'un', transliteration: "un", meaning: 'not', language: 'English' },
    { prefix: 're', transliteration: "re", meaning: 'again', language: 'English' },
    { prefix: 'des', transliteration: "des", meaning: 'of, from', language: 'French' },
    { prefix: 'non', transliteration: "non", meaning: 'not', language: 'Latin' },
    { prefix: '反', transliteration: "fan", meaning: 'opposite, anti', language: 'Chinese' },
    { prefix: '前', transliteration: "qian", meaning: 'before, front', language: 'Chinese' },
    { prefix: 'ανα', transliteration: "ana", meaning: 'up, back, again', language: 'Greek' },
    { prefix: 'επι', transliteration: "epi", meaning: 'on, upon, over', language: 'Greek' },
    { prefix: 'κατα', transliteration: "kata", meaning: 'down, against', language: 'Greek' },
    { prefix: 'μετα', transliteration: "meta", meaning: 'after, beyond', language: 'Greek' },
    { prefix: 'περι', transliteration: "peri", meaning: 'around, about', language: 'Greek' },
    { prefix: 'ad', transliteration: "ad", meaning: 'to, toward', language: 'Latin' },
    { prefix: 'ex', transliteration: "ex", meaning: 'out of, from', language: 'Latin' },
    { prefix: 'in', transliteration: "in", meaning: 'in, into', language: 'Latin' },
    { prefix: 're', transliteration: "re", meaning: 'back, again', language: 'Latin' },
    { prefix: 'sub', transliteration: "sub", meaning: 'under, below', language: 'Latin' },
    { prefix: 'מ', transliteration: "m", meaning: 'from', language: 'Hebrew' },
    { prefix: 'प्र', transliteration: "pra", meaning: 'before, forward', language: 'Sanskrit' },
    { prefix: '後', transliteration: "go", meaning: 'after, behind', language: 'Japanese' },
    { prefix: 'ミス', transliteration: "misu", meaning: 'wrong, miss', language: 'Japanese' },
    { prefix: 'უ', transliteration: "u", meaning: 'un, not', language: 'Georgian' },
    { prefix: 'முதன்', transliteration: "mudan", meaning: 'first, beginning', language: 'Tamil' },
    { prefix: 'ซุป', transliteration: "sup", meaning: 'super, ultra', language: 'Thai' },
];

export class PrefixTable extends Table {

    constructor() {
        super("Prefixes");
        let prefixes = Prefixes.map((prefix) => prefix.prefix);
        this.ArrayAsTableEntries(prefixes);
    }
}