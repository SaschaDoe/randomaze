import {Table} from "../Table";

export let PlanetChineseNouns = [
    { output: '星辰', transliteration: 'xīngchén', english: 'Star' },
    { output: '宇宙', transliteration: 'yǔzhòu', english: 'Universe' },
    { output: '天空', transliteration: 'tiānkōng', english: 'Sky' },
    { output: '月亮', transliteration: 'yuèliang', english: 'Moon' },
    { output: '太阳', transliteration: 'tàiyáng', english: 'Sun' },
    { output: '星球', transliteration: 'xīngqiú', english: 'Planet' },
    { output: '苍穹', transliteration: 'cāngqióng', english: 'Firmament' },
    { output: '尘埃', transliteration: 'chén\'āi', english: 'Dust' },
    { output: '幻境', transliteration: 'huànjìng', english: 'Realm' },
    { output: '时空', transliteration: 'shíkōng', english: 'Space-Time' },
    { output: '永恒', transliteration: 'yǒnghéng', english: 'Eternity' },
    { output: '命运', transliteration: 'mìngyùn', english: 'Destiny' },
    { output: '传说', transliteration: 'chuánshuō', english: 'Legend' },
    { output: '荣耀', transliteration: 'róngyào', english: 'Glory' },
    { output: '战争', transliteration: 'zhànzhēng', english: 'War' },
    { output: '英雄', transliteration: 'yīngxióng', english: 'Hero' },
    { output: '神话', transliteration: 'shénhuà', english: 'Myth' },
    { output: '奇迹', transliteration: 'qíjì', english: 'Miracle' },
    { output: '王国', transliteration: 'wángguó', english: 'Kingdom' },
    { output: '魔法', transliteration: 'mófǎ', english: 'Magic' },
    { output: '希望', transliteration: 'xīwàng', english: 'Hope' },
    { output: '远方', transliteration: 'yuǎnfāng', english: 'Distant Land' },
    { output: '气息', transliteration: 'qìxī', english: 'Aura' },
    { output: '神圣', transliteration: 'shénshèng', english: 'Divinity' },
    { output: '伟业', transliteration: 'wěiyè', english: 'Great Achievement' },
    { output: '梦想', transliteration: 'mèngxiǎng', english: 'Dream' },
    { output: '帝国', transliteration: 'dìguó', english: 'Empire' },
    { output: '灵魂', transliteration: 'línghún', english: 'Soul' },
    { output: '征程', transliteration: 'zhēngchéng', english: 'Journey' },
    { output: '勇气', transliteration: 'yǒngqì', english: 'Courage' },
    { output: '宿命', transliteration: 'sùmìng', english: 'Fate' },
    { output: '宝藏', transliteration: 'bǎozàng', english: 'Treasure' },
    { output: '传承', transliteration: 'chuánchéng', english: 'Legacy' },
    { output: '神光', transliteration: 'shénguāng', english: 'Divine Light' },
    { output: '追逐', transliteration: 'zhuīzhú', english: 'Pursuit' },
    { output: '希罕', transliteration: 'xīhǎn', english: 'Rare' },
    { output: '无限', transliteration: 'wúxiàn', english: 'Infinity' },
    { output: '传奇', transliteration: 'chuánqí', english: 'Epic' },
    { output: '天命', transliteration: 'tiānmìng', english: 'Heavenly Mandate' },
    { output: '命运', transliteration: 'mìngyùn', english: 'Fate' },
    { output: '风暴', transliteration: 'fēngbào', english: 'Storm' },
    { output: '圣殿', transliteration: 'shèngdiàn', english: 'Sanctuary' },
    { output: '仙境', transliteration: 'xiānjìng', english: 'Fairyland' },
];

export class PlanetChineseNounsTable extends Table {
    constructor() {
        super("Planet Chinese Nouns");
        let chinesePlanetNouns = PlanetChineseNouns.map((noun) => noun.output);
        this.ArrayAsTableEntries(chinesePlanetNouns);
    }
}
