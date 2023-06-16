import {Table} from "../Table";
import {Sizes} from "./SizeTable";

export let LatinSuffixes = [
    { suffix: 'arius', meaning: 'connected with or belonging to' },
    { suffix: 'bundus', meaning: 'prone to' },
    { suffix: 'culus', meaning: 'diminutive' },
    { suffix: 'fer', meaning: 'bearing' },
    { suffix: 'ficus', meaning: 'making or doing' },
    { suffix: 'gens', meaning: 'producing or yielding' },
    { suffix: 'iger', meaning: 'bearing or producing' },
    { suffix: 'ilis', meaning: 'ability, susceptibility, disposition' },
    { suffix: 'mentum', meaning: 'result of action' },
    { suffix: 'orium', meaning: 'place for or belonging to' },
    { suffix: 'osus', meaning: 'full of or prone to' },
    { suffix: 'tudo', meaning: 'state or condition' },
    { suffix: 'ulentus', meaning: 'full of or abounding in' },
    { suffix: 'undus', meaning: 'tending to or inclined to' },
    { suffix: 'urnus', meaning: 'occurring regularly' },
    { suffix: 'vorus', meaning: 'eating or consuming' },
    { suffix: 'ia', meaning: 'condition, quality, act; country, land' },
    { suffix: 'um', meaning: 'indicating a neuter noun in the nominative singular form' },
    { suffix: 'is', meaning: 'used in both masculine and feminine nouns in the genitive singular form' },
    { suffix: 'us', meaning: 'common ending for masculine nouns in the nominative singular form' },
    { suffix: 'a', meaning: 'common ending for feminine nouns in the nominative singular form' },
    { suffix: 'ix', meaning: 'denotes a female agent of action' },
    { suffix: 'or', meaning: 'denotes an agent or doer, often used for abstract nouns' },
    { suffix: 'as', meaning: 'used for masculine or feminine nouns in the accusative plural form' },
    { suffix: 'es', meaning: 'common ending for masculine/feminine nouns in the accusative plural form' },
    { suffix: 'us', meaning: 'common ending for fourth declension nouns' }

];

export class LatinSuffixesTable extends Table{

    constructor() {
        super("Latin Suffixes");
        let latinSuffixes = LatinSuffixes.map((suffix) => suffix.suffix);
        this.ArrayAsTableEntries(latinSuffixes);
    }
}