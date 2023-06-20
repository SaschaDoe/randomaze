import {Table} from "../../Table";

export let PlanetGreekAdjectives = [
    { output: 'αρχαίος', transliteration: 'archai', english: 'Ancient' },
    { output: 'αστραφτερός', transliteration: 'astrapter', english: 'Sparkling' },
    { output: 'μεγαλειώδης', transliteration: 'megaleiod', english: 'Majestic' },
    { output: 'θρυλικός', transliteration: 'thrul', english: 'Legendary' },
    { output: 'θεϊκός', transliteration: 'theik', english: 'Divine' },
    { output: 'εκθαμβωτικός', transliteration: 'ekthamvot', english: 'Dazzling' },
    { output: 'υπερήφανος', transliteration: 'iperifan', english: 'Proud' },
    { output: 'μοναδικός', transliteration: 'monad', english: 'Unique' },
    { output: 'εντυπωσιακός', transliteration: 'entipiak', english: 'Impressive' },
    { output: 'αρμονικός', transliteration: 'armon', english: 'Harmonious' },
    { output: 'εκπληκτικός', transliteration: 'ekplikt', english: 'Astounding' },
    { output: 'καταπληκτικός', transliteration: 'kataplikt', english: 'Stunning' },
    { output: 'θεαματικός', transliteration: 'theamat', english: 'Spectacular' },
    { output: 'ελκυστικός', transliteration: 'elkist', english: 'Enchanting' },
    { output: 'πανέμορφος', transliteration: 'panemorf', english: 'Exquisite' },
    { output: 'θερμός', transliteration: 'therm', english: 'Warm' },
    { output: 'πανίσχυρος', transliteration: 'panischyr', english: 'Mighty' },
    { output: 'ακαταμάχητος', transliteration: 'akatamachit', english: 'Unbeatable' },
    { output: 'συναρπαστικός', transliteration: 'synarpast', english: 'Thrilling' },
    { output: 'απερίγραπτος', transliteration: 'aperigrapt', english: 'Indescribable' },
    { output: 'αθάνατος', transliteration: 'athanat', english: 'Immortal' },
    { output: 'ακατανίκητος', transliteration: 'akatanikit', english: 'Invincible' },
    { output: 'εξαιρετικός', transliteration: 'exairet', english: 'Exceptional' },
    { output: 'απόκοσμος', transliteration: 'apokm', english: 'Otherworldly' },
    { output: 'ακατανίκητος', transliteration: 'akatan', english: 'Unconquerable' },
    { output: 'εντυπωσιακός', transliteration: 'entipiak', english: 'Breathtaking' },
    { output: 'θαυμαστός', transliteration: 'thavmast', english: 'Wonderful' },
    { output: 'ασυναγώνιστος', transliteration: 'asynagonist', english: 'Unparalleled' },
    { output: 'αριστοκρατικός', transliteration: 'aristokrat', english: 'Noble' },
    { output: 'απόλυτος', transliteration: 'apolit', english: 'Absolute' },
    { output: 'εκρηκτικός', transliteration: 'ekrekt', english: 'Explive' },
    { output: 'γοητευτικός', transliteration: 'yitift', english: 'Charming' },
    { output: 'ακαταμάχητος', transliteration: 'akatamach', english: 'Unassailable' },
    { output: 'ακατανίκητος', transliteration: 'akatanik', english: 'Unconquerable' },
];

export class PlanetGreekAdjectivesTable extends Table {
    constructor() {
        super("Planet Greek Adjectives");
        let greekPlanetAdjectives = PlanetGreekAdjectives.map((adjective) => adjective.output);
        this.ArrayAsTableEntries(greekPlanetAdjectives);
    }
}
