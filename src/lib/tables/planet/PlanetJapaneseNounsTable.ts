import {Table} from "../Table";

export let PlanetJapaneseNouns = [
    { output: '光', transliteration: 'Hikari', english: 'Light' },
    { output: '平和', transliteration: 'Heiwa', english: 'Peace' },
    { output: '鉄', transliteration: 'Tetsu', english: 'Iron' },
    { output: '火', transliteration: 'Hi', english: 'Fire' },
    { output: '水', transliteration: 'Mizu', english: 'Water' },
    { output: '風', transliteration: 'Kaze', english: 'Wind' },
    { output: '空', transliteration: 'Sora', english: 'Sky' },
    { output: '地球', transliteration: 'Chikyu', english: 'Earth' },
    { output: '森', transliteration: 'Mori', english: 'Forest' },
    { output: '海', transliteration: 'Umi', english: 'Sea' },
    { output: '太陽', transliteration: 'Taiyou', english: 'Sun' },
    { output: '月', transliteration: 'Tsuki', english: 'Moon' },
    { output: '星', transliteration: 'Hoshi', english: 'Star' },
    { output: '金', transliteration: 'Kin', english: 'Gold' },
    { output: '銀', transliteration: 'Gin', english: 'Silver' },
    { output: '雪', transliteration: 'Yuki', english: 'Snow' },
    { output: '雲', transliteration: 'Kumo', english: 'Cloud' },
    { output: '雷', transliteration: 'Kaminari', english: 'Lightning' },
    { output: '時間', transliteration: 'Jikan', english: 'Time' },
    { output: '音', transliteration: 'Oto', english: 'Sound' },
    { output: '夢', transliteration: 'Yume', english: 'Dream' },
    { output: '霊', transliteration: 'Rei', english: 'Spirit' },
    { output: '心', transliteration: 'Kokoro', english: 'Heart' },
    { output: '真実', transliteration: 'Shinjitsu', english: 'Truth' },
    { output: '勇気', transliteration: 'Yuuki', english: 'Courage' },
    { output: '愛', transliteration: 'Ai', english: 'Love' },
    { output: '知恵', transliteration: 'Chie', english: 'Wisdom' },
    { output: '希望', transliteration: 'Kibou', english: 'Hope' },
    { output: '美', transliteration: 'Bi', english: 'Beauty' },
    { output: '永遠', transliteration: 'Eien', english: 'Eternity' },
    { output: '幸福', transliteration: 'Koufuku', english: 'Happiness' },
    { output: '自由', transliteration: 'Jiyuu', english: 'Freedom' },
    { output: '冒険', transliteration: 'Bouken', english: 'Adventure' },
    { output: '名誉', transliteration: 'Meiyo', english: 'Honor' },
    { output: '力', transliteration: 'Chikara', english: 'Power' },
    { output: '運命', transliteration: 'Unmei', english: 'Destiny' },
    { output: '友情', transliteration: 'Yuujou', english: 'Friendship' },
    { output: '繁栄', transliteration: 'Hanei', english: 'Prosperity' },
    { output: '奇跡', transliteration: 'Kiseki', english: 'Miracle' },
    { output: '信念', transliteration: 'Shinnen', english: 'Belief' },
    { output: '正義', transliteration: 'Seigi', english: 'Justice' },
];

export class PlanetJapaneseNounsTable extends Table{
    constructor() {
        super("Planet Japanese Nouns");
        let japanesePlanetNouns = PlanetJapaneseNouns.map((noun) => noun.output);
        this.ArrayAsTableEntries(japanesePlanetNouns);
    }
}
