import {Table} from "../Table";

export let PlanetSanskritNouns = [
    { output: 'प्रकाश', transliteration: 'Prakāśa', english: 'Light' },
    { output: 'शान्ति', transliteration: 'Shānti', english: 'Peace' },
    { output: 'लोह', transliteration: 'Loha', english: 'Iron' },
    { output: 'अग्नि', transliteration: 'Agni', english: 'Fire' },
    { output: 'जल', transliteration: 'Jala', english: 'Water' },
    { output: 'वायु', transliteration: 'Vāyu', english: 'Wind' },
    { output: 'आकाश', transliteration: 'Ākāśa', english: 'Sky' },
    { output: 'पृथ्वी', transliteration: 'Pṛthvī', english: 'Earth' },
    { output: 'वन', transliteration: 'Vana', english: 'Forest' },
    { output: 'समुद्र', transliteration: 'Samudra', english: 'Sea' },
    { output: 'सूर्य', transliteration: 'Sūrya', english: 'Sun' },
    { output: 'चंद्र', transliteration: 'Candra', english: 'Moon' },
    { output: 'तारा', transliteration: 'Tārā', english: 'Star' },
    { output: 'स्वर्ण', transliteration: 'Svarṇa', english: 'Gold' },
    { output: 'रजत', transliteration: 'Rajata', english: 'Silver' },
    { output: 'हिम', transliteration: 'Hima', english: 'Snow' },
    { output: 'मेघ', transliteration: 'Megha', english: 'Cloud' },
    { output: 'विद्युत्', transliteration: 'Vidyut', english: 'Lightning' },
    { output: 'काल', transliteration: 'Kāla', english: 'Time' },
    { output: 'ध्वनि', transliteration: 'Dhvani', english: 'Sound' },
    { output: 'निद्रा', transliteration: 'Nidrā', english: 'Sleep' },
    { output: 'आत्मन्', transliteration: 'Ātman', english: 'Soul' },
    { output: 'हृदय', transliteration: 'Hṛdaya', english: 'Heart' },
    { output: 'सत्य', transliteration: 'Satya', english: 'Truth' },
    { output: 'वीर्य', transliteration: 'Vīrya', english: 'Courage' },
    { output: 'प्रेम', transliteration: 'Prema', english: 'Love' },
    { output: 'ज्ञान', transliteration: 'Jñāna', english: 'Knowledge' },
    { output: 'मोक्ष', transliteration: 'Mokṣa', english: 'Liberation' },
    { output: 'अनंत', transliteration: 'Ananta', english: 'Infinite' },
    { output: 'यात्रा', transliteration: 'Yātrā', english: 'Journey' },
    { output: 'स्वप्न', transliteration: 'Svapna', english: 'Dream' },
    { output: 'विश्व', transliteration: 'Viśva', english: 'Universe' },
    { output: 'शक्ति', transliteration: 'Śakti', english: 'Power' },
    { output: 'धर्म', transliteration: 'Dharma', english: 'Righteousness' },
    { output: 'अनुभव', transliteration: 'Anubhava', english: 'Experience' },
    { output: 'अद्वितीय', transliteration: 'Advitīya', english: 'Unique' },
    { output: 'वीर', transliteration: 'Vīra', english: 'Hero' },
    { output: 'योग', transliteration: 'Yoga', english: 'Unity' },
    { output: 'माया', transliteration: 'Māyā', english: 'Illusion' },
    { output: 'प्रकृति', transliteration: 'Prakṛti', english: 'Nature' },
];

export class PlanetSanskritNounsTable extends Table{
    constructor() {
        super("Planet Sanskrit Nouns");
        let sanskritPlanetNouns = PlanetSanskritNouns.map((noun) => noun.output);
        this.ArrayAsTableEntries(sanskritPlanetNouns);
    }
}
