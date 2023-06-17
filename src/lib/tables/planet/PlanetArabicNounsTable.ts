import {Table} from "../Table";
export let PlanetArabicNouns = [
    { output: 'نور', transliteration: 'nur', english: 'Light' },
    { output: 'سلام', transliteration: 'salam', english: 'Peace' },
    { output: 'حديد', transliteration: 'hadid', english: 'Iron' },
    { output: 'نار', transliteration: 'nar', english: 'Fire' },
    { output: 'ماء', transliteration: 'maa', english: 'Water' },
    { output: 'ريح', transliteration: 'rih', english: 'Wind' },
    { output: 'سماء', transliteration: 'samaa', english: 'Sky' },
    { output: 'أرض', transliteration: 'ard', english: 'Earth' },
    { output: 'غابة', transliteration: 'ghaba', english: 'Forest' },
    { output: 'بحر', transliteration: 'bahr', english: 'Sea' },
    { output: 'شمس', transliteration: 'shams', english: 'Sun' },
    { output: 'قمر', transliteration: 'qamar', english: 'Moon' },
    { output: 'نجم', transliteration: 'najm', english: 'Star' },
    { output: 'ذهب', transliteration: 'dhahab', english: 'Gold' },
    { output: 'فضة', transliteration: 'fidda', english: 'Silver' },
    { output: 'ثلج', transliteration: 'thalj', english: 'Snow' },
    { output: 'سحاب', transliteration: 'sahab', english: 'Cloud' },
    { output: 'برق', transliteration: 'barq', english: 'Lightning' },
    { output: 'وقت', transliteration: 'wakt', english: 'Time' },
    { output: 'صوت', transliteration: 'saut', english: 'Sound' },
    { output: 'نوم', transliteration: 'naum', english: 'Sleep' },
    { output: 'روح', transliteration: 'ruh', english: 'Spirit' },
    { output: 'قلب', transliteration: 'qalb', english: 'Heart' },
    { output: 'حق', transliteration: 'haq', english: 'Truth' },
    { output: 'شجاعة', transliteration: 'shajaah', english: 'Courage' },
    { output: 'حب', transliteration: 'hubb', english: 'Love' },
    { output: 'حكمة', transliteration: 'hikmah', english: 'Wisdom' },
    { output: 'عاصفة', transliteration: 'aasifa', english: 'Storm' },
    { output: 'سر', transliteration: 'sirr', english: 'Secret' },
    { output: 'الغموض', transliteration: 'alghamoud', english: 'Mystery' },
    { output: 'عظمة', transliteration: 'adhma', english: 'Greatness' },
    { output: 'السحر', transliteration: 'sihr', english: 'Magic' },
    { output: 'الشرف', transliteration: 'sharaf', english: 'Honor' },
    { output: 'القوة', transliteration: 'quwwa', english: 'Power' },
    { output: 'العدالة', transliteration: 'adalaa', english: 'Justice' },
    { output: 'التحدي', transliteration: 'tahaddi', english: 'Challenge' },
    { output: 'الشجاعة', transliteration: 'shajaa', english: 'Bravery' },
    { output: 'الكرامة', transliteration: 'karama', english: 'Dignity' },
    { output: 'الأمل', transliteration: 'amal', english: 'Hope' },
    { output: 'المجد', transliteration: 'majd', english: 'Glory' },
    { output: 'الثورة', transliteration: 'thawra', english: 'Revolution' },
    { output: 'البطولة', transliteration: 'butula', english: 'Heroism' },
    { output: 'الأبدية', transliteration: 'abadia', english: 'Eternity' },
    { output: 'الحرية', transliteration: 'hurriya', english: 'Freedom' },
    { output: 'الصمود', transliteration: 'samed', english: 'Resilience' },
    { output: 'الصبر', transliteration: 'sabr', english: 'Patience' },
];

export class PlanetArabicNounsTable extends Table{
    constructor() {
        super("Planet Arabic Nouns");
        let arabicPlanetNouns = PlanetArabicNouns.map((noun) => noun.output);
        this.ArrayAsTableEntries(arabicPlanetNouns);
    }
}
