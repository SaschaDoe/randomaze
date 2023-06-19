import {Table} from "../Table";

export let PlanetGreekAdjectives = [
    { output: 'επικός', transliteration: 'epikos', english: 'Epic' },
    { output: 'μυστηριώδης', transliteration: 'mysteriodis', english: 'Mysterious' },
    { output: 'αρχαίος', transliteration: 'archaios', english: 'Ancient' },
    { output: 'αστραφτερός', transliteration: 'astrapteros', english: 'Sparkling' },
    { output: 'μεγαλειώδης', transliteration: 'megaleiodis', english: 'Majestic' },
    { output: 'θρυλικός', transliteration: 'thrulikos', english: 'Legendary' },
    { output: 'θεϊκός', transliteration: 'theikos', english: 'Divine' },
    { output: 'εκθαμβωτικός', transliteration: 'ekthamvotikos', english: 'Dazzling' },
    { output: 'υπερήφανος', transliteration: 'iperifanos', english: 'Proud' },
    { output: 'μοναδικός', transliteration: 'monadikos', english: 'Unique' },
    { output: 'εντυπωσιακός', transliteration: 'entiposiakos', english: 'Impressive' },
    { output: 'αρμονικός', transliteration: 'armonikos', english: 'Harmonious' },
    { output: 'εκπληκτικός', transliteration: 'ekpliktikos', english: 'Astounding' },
    { output: 'καταπληκτικός', transliteration: 'katapliktikos', english: 'Stunning' },
    { output: 'θεαματικός', transliteration: 'theamatikos', english: 'Spectacular' },
    { output: 'ελκυστικός', transliteration: 'elkistikos', english: 'Enchanting' },
    { output: 'πανέμορφος', transliteration: 'panemorfos', english: 'Exquisite' },
    { output: 'θερμός', transliteration: 'thermos', english: 'Warm' },
    { output: 'πανίσχυρος', transliteration: 'panischyros', english: 'Mighty' },
    { output: 'ακαταμάχητος', transliteration: 'akatamachitos', english: 'Unbeatable' },
    { output: 'συναρπαστικός', transliteration: 'synarpastikos', english: 'Thrilling' },
    { output: 'απερίγραπτος', transliteration: 'aperigraptos', english: 'Indescribable' },
    { output: 'αθάνατος', transliteration: 'athanatos', english: 'Immortal' },
    { output: 'ακατανίκητος', transliteration: 'akatanikitos', english: 'Invincible' },
    { output: 'εξαιρετικός', transliteration: 'exairetikos', english: 'Exceptional' },
    { output: 'απόκοσμος', transliteration: 'apokosmos', english: 'Otherworldly' },
    { output: 'ακατανίκητος', transliteration: 'akatanikitos', english: 'Unconquerable' },
    { output: 'εντυπωσιακός', transliteration: 'entiposiakos', english: 'Breathtaking' },
    { output: 'εντυπωσιακός', transliteration: 'entiposiakos', english: 'Impressive' },
    { output: 'θαυμαστός', transliteration: 'thavmastos', english: 'Wonderful' },
    { output: 'ασυναγώνιστος', transliteration: 'asynagonistos', english: 'Unparalleled' },
    { output: 'αριστοκρατικός', transliteration: 'aristokratikos', english: 'Noble' },
    { output: 'απόλυτος', transliteration: 'apolitos', english: 'Absolute' },
    { output: 'εκρηκτικός', transliteration: 'ekrektikos', english: 'Explosive' },
    { output: 'γοητευτικός', transliteration: 'yitiftikos', english: 'Charming' },
    { output: 'ακαταμάχητος', transliteration: 'akatamachitos', english: 'Unassailable' },
    { output: 'ακατανίκητος', transliteration: 'akatanikitos', english: 'Unconquerable' },
];

export class PlanetGreekAdjectivesTable extends Table {
    constructor() {
        super("Planet Greek Adjectives");
        let greekPlanetAdjectives = PlanetGreekAdjectives.map((adjective) => adjective.output);
        this.ArrayAsTableEntries(greekPlanetAdjectives);
    }
}
