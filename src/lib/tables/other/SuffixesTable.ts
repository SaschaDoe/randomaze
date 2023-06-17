import {Table} from "../Table";

export let Suffixes = [,
    { suffix: 'ας', transliteration: "as", meaning: 'belonging to', language: 'Greek' },
    { suffix: 'ικός', transliteration: "ikos", meaning: 'related to, pertaining to', language: 'Greek' },
    { suffix: 'us', transliteration: "us", meaning: 'belonging to', language: 'Latin' },
    { suffix: 'orum', transliteration: "orum", meaning: 'belonging to', language: 'Latin' },
    { suffix: '系', transliteration: "kei", meaning: 'related to, system', language: 'Japanese' },
    { suffix: '한테', transliteration: "hante", meaning: 'to, towards', language: 'Korean' },
    { suffix: '이다', transliteration: "ida", meaning: 'to be', language: 'Korean' },
    { suffix: '처럼', transliteration: "cheoreom", meaning: 'like, as', language: 'Korean' },
    { suffix: '라는', transliteration: "raneun", meaning: 'called, known as', language: 'Korean' },
];

export class SuffixesTable extends Table {

    constructor() {
        super("Suffixes");
        let suffixes = Suffixes.map((suffix) => suffix.suffix);
        this.ArrayAsTableEntries(suffixes);
    }
}
