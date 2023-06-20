import {Table} from "../../Table";

export let PlanetSanskritAdjectives = [
    { output: 'शान्त', transliteration: 'shaanta', english: 'Peaceful' },
    { output: 'महान्', transliteration: 'mahaan', english: 'Great' },
    { output: 'आद्य', transliteration: 'aadya', english: 'Primordial' },
    { output: 'ज्योतिष्मान्', transliteration: 'jyotishmaan', english: 'Radiant' },
    { output: 'महिमान्', transliteration: 'mahimaan', english: 'Majestic' },
    { output: 'प्रसिद्ध', transliteration: 'prasiddha', english: 'Famous' },
    { output: 'दिव्य', transliteration: 'divya', english: 'Divine' },
    { output: 'चारु', transliteration: 'chaaru', english: 'Beautiful' },
    { output: 'अतीव', transliteration: 'ativa', english: 'Exceedingly' },
    { output: 'आद्यतम', transliteration: 'aadyatam', english: 'Primordial' },
    { output: 'आत्मवान्', transliteration: 'aatmavaan', english: 'Self-sufficient' },
    { output: 'मधुर', transliteration: 'madhura', english: 'Sweet' },
    { output: 'अद्भुत', transliteration: 'adbhuta', english: 'Wonderful' },
    { output: 'प्रतापी', transliteration: 'prataapee', english: 'Radiant' },
    { output: 'उत्कृष्ट', transliteration: 'utkrishṭa', english: 'Excellent' },
    { output: 'मान्य', transliteration: 'maanya', english: 'Respected' },
    { output: 'सुलभ', transliteration: 'sulabha', english: 'Accessible' },
    { output: 'सदैव', transliteration: 'sadaiva', english: 'Everlasting' },
    { output: 'अद्वितीय', transliteration: 'advitiiya', english: 'Unparalleled' },
    { output: 'सुवर्ण', transliteration: 'suvarna', english: 'Golden' },
    { output: 'प्रख्यात', transliteration: 'prakhyāta', english: 'Renowned' },
    { output: 'आदित्य', transliteration: 'aadya', english: 'Radiant' },
    { output: 'सुप्रसन्न', transliteration: 'suprasanna', english: 'Blissful' },
    { output: 'अद्यतिष्ठत', transliteration: 'adyatishṭhata', english: 'Everlasting' },
    { output: 'परम', transliteration: 'parama', english: 'Supreme' },
    { output: 'अमृत', transliteration: 'amṛta', english: 'Immortal' },
    { output: 'अद्वितीय', transliteration: 'advitiiya', english: 'Unrivaled' },
    { output: 'प्रतिष्ठित', transliteration: 'pratishṭhita', english: 'Respected' },
    { output: 'अभिनव', transliteration: 'abhinava', english: 'Innovative' },
    { output: 'सुरेन्द्र', transliteration: 'surendra', english: 'Lordly' },
    { output: 'महात्मा', transliteration: 'mahātmā', english: 'Great-souled' },
    { output: 'वीर', transliteration: 'vīra', english: 'Heroic' },
    { output: 'अभीक्ष्ण', transliteration: 'abhīkṣṇa', english: 'Eternal' },
    { output: 'आत्माराम', transliteration: 'aatmaaraama', english: 'Contented' },
    { output: 'महोच्च', transliteration: 'mahoccha', english: 'Supreme' },
    { output: 'विशाल', transliteration: 'vishaala', english: 'Vast' },
    { output: 'अद्य', transliteration: 'adya', english: 'Current' },
    { output: 'मान्य', transliteration: 'maanya', english: 'Honorable' },
    { output: 'विलक्षण', transliteration: 'vilakṣaṇa', english: 'Distinctive' },
    { output: 'वीर्यवान्', transliteration: 'vīryavān', english: 'Valiant' },
    { output: 'वीर', transliteration: 'vīra', english: 'Courageous' },
    { output: 'उत्तम', transliteration: 'uttama', english: 'Excellent' },
    { output: 'अद्वैत', transliteration: 'advaita', english: 'Non-dual' },
    { output: 'आत्मसात', transliteration: 'aatmasāta', english: 'Self-existent' },
    { output: 'आनन्द', transliteration: 'aananda', english: 'Blissful' },
    { output: 'महान्', transliteration: 'mahaan', english: 'Grand' },
    { output: 'अद्वैतीय', transliteration: 'advaitiiya', english: 'Unifying' },
    { output: 'अविचलित', transliteration: 'avichalita', english: 'Unwavering' },
    { output: 'अग्निप्रकाश', transliteration: 'agniprakāśa', english: 'Radiant like fire' },
    { output: 'अमिताभ', transliteration: 'amitābha', english: 'Infinite light' },
    { output: 'आनन्दमय', transliteration: 'aanandamaya', english: 'Full of joy' },
];

export class PlanetSanskritAdjectivesTable extends Table {
    constructor() {
        super("Planet Sanskrit Adjectives");
        let sanskritPlanetAdjectives = PlanetSanskritAdjectives.map((adjective) => adjective.output);
        this.ArrayAsTableEntries(sanskritPlanetAdjectives);
    }
}
