import {Table} from "../../Table";

export let PlanetJapaneseAdjectives = [
    { output: '壮大な', transliteration: 'soudai', english: 'Grand' },
    { output: '神秘的な', transliteration: 'shinpi', english: 'Mystical' },
    { output: '古代の', transliteration: 'kodai', english: 'Ancient' },
    { output: '輝く', transliteration: 'kagayaku', english: 'Radiant' },
    { output: '荘厳な', transliteration: 'sougon', english: 'Majestic' },
    { output: '伝説的な', transliteration: 'densetsu', english: 'Legendary' },
    { output: '神聖な', transliteration: 'shinsei', english: 'Sacred' },
    { output: '魅惑的な', transliteration: 'miwaku', english: 'Enchanting' },
    { output: '優雅な', transliteration: 'yuuga', english: 'Elegant' },
    { output: '美しい', transliteration: 'utsukushii', english: 'Beautiful' },
    { output: '奥深い', transliteration: 'okubukai', english: 'Profound' },
    { output: '驚くべき', transliteration: 'odorokubeki', english: 'Astounding' },
    { output: '壮観な', transliteration: 'soukan', english: 'Spectacular' },
    { output: '魅力的な', transliteration: 'miryoku', english: 'Captivating' },
    { output: '優れた', transliteration: 'sugureta', english: 'Excellent' },
    { output: '神秘的な', transliteration: 'shinpi', english: 'Mysterious' },
    { output: '不思議な', transliteration: 'fushigi', english: 'Wonderful' },
    { output: '壮大な', transliteration: 'soudai', english: 'Magnificent' },
    { output: '唯一の', transliteration: 'yuiitsu', english: 'Unique' },
    { output: '温かい', transliteration: 'atatakai', english: 'Warm' },
    { output: '力強い', transliteration: 'chikarazuyoi', english: 'Powerful' },
    { output: '圧倒的な', transliteration: 'attouteki', english: 'Overwhelming' },
    { output: '抱かせる', transliteration: 'idakase', english: 'Inspiring' },
    { output: '驚', transliteration: 'kyoi', english: 'Remarkable' },
    { output: '感', transliteration: 'kandou', english: 'Touching' },
    { output: '永遠の', transliteration: 'eien', english: 'Eternal' },
    { output: '美麗な', transliteration: 'birei', english: 'Gorgeous' },
    { output: '勇敢な', transliteration: 'yuukan', english: 'Brave' },
    { output: '偉大な', transliteration: 'idai', english: 'Great' },
    { output: '晴れやかな', transliteration: 'hareyaka', english: 'Radiant' },
    { output: '静かな', transliteration: 'shizuka', english: 'Serene' },
    { output: '美しき', transliteration: 'utsuku', english: 'Beautiful' },
    { output: '神々しい', transliteration: 'kamigama', english: 'Divine' },
    { output: '気高い', transliteration: 'kedakai', english: 'Noble' },
    { output: '鮮やかな', transliteration: 'azayaka', english: 'Vibrant' },
    { output: '神秘な', transliteration: 'shinpi', english: 'Mysterious' },
    { output: '勇ましい', transliteration: 'isama', english: 'Courageous' },
    { output: '輝かしい', transliteration: 'kagayaka', english: 'Glorious' },
    { output: '素晴らしい', transliteration: 'subara', english: 'Wonderful' },
];

export class PlanetJapaneseAdjectivesTable extends Table {
    constructor() {
        super("Planet Japanese Adjectives");
        let japanesePlanetAdjectives = PlanetJapaneseAdjectives.map((adjective) => adjective.output);
        this.ArrayAsTableEntries(japanesePlanetAdjectives);
    }
}
