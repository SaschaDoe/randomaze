import {Table} from "../Table";

export let Suffixes = [
    { suffix: 'ας', transliteration: "as", meaning: 'belonging to', language: 'Greek' },
    { suffix: 'ικός', transliteration: "ikos", meaning: 'related to, pertaining to', language: 'Greek' },
    { suffix: 'us', transliteration: "us", meaning: 'belonging to', language: 'Latin' },
    { suffix: 'orum', transliteration: "orum", meaning: 'belonging to', language: 'Latin' },
    { suffix: '系', transliteration: "kei", meaning: 'related to, system', language: 'Japanese' },
    { suffix: '한테', transliteration: "hante", meaning: 'to, towards', language: 'Korean' },
    { suffix: '이다', transliteration: "ida", meaning: 'to be', language: 'Korean' },
    { suffix: '라는', transliteration: "raneun", meaning: 'called, known as', language: 'Korean' },
    { suffix: 'arium', transliteration: "arium", meaning: 'place of or for', language: 'Latin' },
    { suffix: 'φιλος', transliteration: "philos", meaning: 'loving, fond of', language: 'Greek' },
    { suffix: '風', transliteration: "fuu", meaning: 'style, manner', language: 'Japanese' },
    { suffix: '적', transliteration: "jeok", meaning: 'characteristic of', language: 'Korean' },
];

export class SuffixesTable extends Table {

    constructor() {
        super("Suffixes");
        let suffixes = Suffixes.map((suffix) => suffix.suffix);
        this.ArrayAsTableEntries(suffixes);
    }
}
