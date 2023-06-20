import {Table} from "../../Table";

export let PlanetArabicAdjectives = [
    { output: 'عظيم', transliteration: 'azheem', english: 'Majestic' },
    { output: 'باهر', transliteration: 'bahir', english: 'Radiant' },
    { output: 'شامخ', transliteration: 'shamikh', english: 'Towerinig' },
    { output: 'عملاق', transliteration: 'amalik', english: 'Colossal' },
    { output: 'شرس', transliteration: 'shars', english: 'Fierce' },
    { output: 'أسطوري', transliteration: 'usturi', english: 'Legendary' },
    { output: 'مهيب', transliteration: 'muhayyib', english: 'Awe-Inspiring' },
    { output: 'مجيد', transliteration: 'majeed', english: 'Glorious' },
    { output: 'سحري', transliteration: 'sahri', english: 'Enchanting' },
    { output: 'فاتن', transliteration: 'fatin', english: 'Captivating' },
    { output: 'عابق', transliteration: 'aabiq', english: 'Fragrant' },
    { output: 'عميق', transliteration: 'ameeq', english: 'Profound' },
    { output: 'مدهش', transliteration: 'mudhish', english: 'Marvelous' },
    { output: 'مشرق', transliteration: 'mushriq', english: 'Radiant' },
    { output: 'رائع', transliteration: 'raa\'ee', english: 'Magnificent' },
    { output: 'أنيق', transliteration: 'aneeq', english: 'Elegant' },
    { output: 'غامض', transliteration: 'ghamidh', english: 'Mysterious' },
    { output: 'بديع', transliteration: 'badee', english: 'Exquisite' },
    { output: 'فريد', transliteration: 'fareed', english: 'Unique' },
    { output: 'عالي', transliteration: 'aali', english: 'Lofty' },
    { output: 'منير', transliteration: 'munir', english: 'Illuminated' },
    { output: 'ساحر', transliteration: 'sahhir', english: 'Spellbinding' },
    { output: 'جريء', transliteration: 'jaree', english: 'Valiant' },
    { output: 'عادل', transliteration: 'aadel', english: 'Just' },
    { output: 'أساسي', transliteration: 'asasi', english: 'Essential' },
    { output: 'عاطفي', transliteration: 'aatefi', english: 'Passionate' },
    { output: 'أبدي', transliteration: 'abdi', english: 'Eternal' },
    { output: 'عزيز', transliteration: 'aziz', english: 'Beloved' },
    { output: 'وفي', transliteration: 'wafi', english: 'Loyal' },
    { output: 'بطل', transliteration: 'batil', english: 'Heroic' },
    { output: 'نبيل', transliteration: 'nabeel', english: 'Noble' },
    { output: 'عزيمة', transliteration: 'azeemah', english: 'Resolute' },
    { output: 'ساكن', transliteration: 'saakin', english: 'Serene' },
    { output: 'مرموق', transliteration: 'marmuq', english: 'Distinguished' },
    { output: 'مبهر', transliteration: 'mubhir', english: 'Mesmerizing' },
    { output: 'حكيم', transliteration: 'hakeem', english: 'Wise' },
    { output: 'قوي', transliteration: 'qawi', english: 'Powerful' },
    { output: 'أروع', transliteration: 'arwa', english: 'Sublime' },
    { output: 'جليل', transliteration: 'jaleel', english: 'Glorious' },
    { output: 'واعي', transliteration: 'waaee', english: 'Conscious' },
    { output: 'عميق', transliteration: 'ameeq', english: 'Deep' },
    { output: 'لامع', transliteration: 'laame', english: 'Shimmering' },
    { output: 'عالمي', transliteration: 'aalmi', english: 'Cosmic' },
];

export class PlanetArabicAdjectivesTable extends Table {
    constructor() {
        super("Planet Arabic Adjectives");
        let arabicPlanetAdjectives = PlanetArabicAdjectives.map((adjective) => adjective.output);
        this.ArrayAsTableEntries(arabicPlanetAdjectives);
    }
}
