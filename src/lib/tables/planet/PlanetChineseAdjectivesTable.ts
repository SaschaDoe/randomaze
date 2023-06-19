import {Table} from "../Table";

export let PlanetChineseAdjectives = [
    { output: '宏伟的', transliteration: 'hóngwěi', english: 'Majestic' },
    { output: '神秘的', transliteration: 'shénmì', english: 'Mysterious' },
    { output: '古老的', transliteration: 'gǔlǎo', english: 'Ancient' },
    { output: '辉煌的', transliteration: 'huīhuáng', english: 'Glorious' },
    { output: '壮丽的', transliteration: 'zhuànglì', english: 'Magnificent' },
    { output: '令人惊叹的', transliteration: 'jīngtàn', english: 'Breathtaking' },
    { output: '神圣的', transliteration: 'shénshèng', english: 'Sacred' },
    { output: '迷人的', transliteration: 'mírén', english: 'Enchanting' },
    { output: '优雅的', transliteration: 'yōuyǎ', english: 'Elegant' },
    { output: '美丽的', transliteration: 'měilì', english: 'Beautiful' },
    { output: '深邃的', transliteration: 'shēnsuì', english: 'Profound' },
    { output: '惊人的', transliteration: 'jīngrén', english: 'Amazing' },
    { output: '壮观的', transliteration: 'zhuàngguān', english: 'Spectacular' },
    { output: '迷人的', transliteration: 'mírén', english: 'Captivating' },
    { output: '卓越的', transliteration: 'zhuóyuè', english: 'Outstanding' },
    { output: '神秘的', transliteration: 'shénmì', english: 'Intriguing' },
    { output: '奇妙的', transliteration: 'qímiào', english: 'Wonderful' },
    { output: '庄严的', transliteration: 'zhuāngyán', english: 'Dignified' },
    { output: '独特的', transliteration: 'dútè', english: 'Unique' },
    { output: '温暖的', transliteration: 'wēnnuǎn', english: 'Warm' },
    { output: '强大的', transliteration: 'qiángdà', english: 'Powerful' },
    { output: '压倒性的', transliteration: 'yādǎoxìng', english: 'Overwhelming' },
    { output: '振奋人心的', transliteration: 'zhènfèn', english: 'Inspiring' },
    { output: '令人惊异的', transliteration: 'jīngyì', english: 'Astounding' },
    { output: '感人的', transliteration: 'gǎnrén', english: 'Touching' },
    { output: '永恒的', transliteration: 'yǒnghéng', english: 'Eternal' },
    { output: '美丽的', transliteration: 'měilì', english: 'Gorgeous' },
    { output: '勇敢的', transliteration: 'yǒnggǎn', english: 'Brave' },
    { output: '伟大的', transliteration: 'wěidà', english: 'Great' },
    { output: '晴朗的', transliteration: 'qínglǎng', english: 'Sunny' },
    { output: '宁静的', transliteration: 'níngjìng', english: 'Peaceful' },
    { output: '美好的', transliteration: 'měihǎo', english: 'Wonderful' },
    { output: '崇高的', transliteration: 'chónggāo', english: 'Sublime' },
    { output: '鲜明的', transliteration: 'xiānmíng', english: 'Vibrant' },
    { output: '神秘的', transliteration: 'shénmì', english: 'Cryptic' },
    { output: '勇敢的', transliteration: 'yǒnggǎn', english: 'Courageous' },
    { output: '辉煌的', transliteration: 'huīhuáng', english: 'Splendid' },
];

export class PlanetChineseAdjectivesTable extends Table {
    constructor() {
        super("Planet Chinese Adjectives");
        let chinesePlanetAdjectives = PlanetChineseAdjectives.map((adjective) => adjective.output);
        this.ArrayAsTableEntries(chinesePlanetAdjectives);
    }
}
