import {Table} from "../Table";
export let PlanetArabicNouns = [
    { output: 'نور', transliteration: 'Nur', english: 'Light' },
    { output: 'سلام', transliteration: 'Salam', english: 'Peace' },
    { output: 'حديد', transliteration: 'Hadid', english: 'Iron' },
    { output: 'نار', transliteration: 'Nar', english: 'Fire' },
    { output: 'ماء', transliteration: 'Maa', english: 'Water' },
    { output: 'ريح', transliteration: 'Rih', english: 'Wind' },
    { output: 'سماء', transliteration: 'Samaa', english: 'Sky' },
    { output: 'أرض', transliteration: 'Ard', english: 'Earth' },
    { output: 'غابة', transliteration: 'Ghaba', english: 'Forest' },
    { output: 'بحر', transliteration: 'Bahr', english: 'Sea' },
    { output: 'شمس', transliteration: 'Shams', english: 'Sun' },
    { output: 'قمر', transliteration: 'Qamar', english: 'Moon' },
    { output: 'نجم', transliteration: 'Najm', english: 'Star' },
    { output: 'ذهب', transliteration: 'Dhahab', english: 'Gold' },
    { output: 'فضة', transliteration: 'Fidda', english: 'Silver' },
    { output: 'ثلج', transliteration: 'Thalj', english: 'Snow' },
    { output: 'سحاب', transliteration: 'Sahab', english: 'Cloud' },
    { output: 'برق', transliteration: 'Barq', english: 'Lightning' },
    { output: 'وقت', transliteration: 'Wakt', english: 'Time' },
    { output: 'صوت', transliteration: 'Saut', english: 'Sound' },
    { output: 'نوم', transliteration: 'Naum', english: 'Sleep' },
    { output: 'روح', transliteration: 'Ruh', english: 'Spirit' },
    { output: 'قلب', transliteration: 'Qalb', english: 'Heart' },
    { output: 'حق', transliteration: 'Haq', english: 'Truth' },
    { output: 'شجاعة', transliteration: 'Shajaah', english: 'Courage' },
    { output: 'حب', transliteration: 'Hubb', english: 'Love' },
    { output: 'حكمة', transliteration: 'Hikmah', english: 'Wisdom' },
    { output: 'عاصفة', transliteration: 'Aasifa', english: 'Storm' },
    { output: 'سر', transliteration: 'Sirr', english: 'Secret' },
    { output: 'الغموض', transliteration: 'Alghamoud', english: 'Mystery' },
    { output: 'عظمة', transliteration: 'Adhma', english: 'Greatness' },
    { output: 'السحر', transliteration: 'Alsihr', english: 'Magic' },
    { output: 'الشرف', transliteration: 'Alsharaf', english: 'Honor' },
    { output: 'القوة', transliteration: 'Alquwwa', english: 'Power' },
    { output: 'العدالة', transliteration: 'Aladalaa', english: 'Justice' },
    { output: 'التحدي', transliteration: 'Altahaddi', english: 'Challenge' },
    { output: 'الشجاعة', transliteration: 'Alshajaa', english: 'Bravery' },
    { output: 'الكرامة', transliteration: 'Alkarama', english: 'Dignity' },
    { output: 'الأمل', transliteration: 'Alamal', english: 'Hope' },
    { output: 'المجد', transliteration: 'Almajd', english: 'Glory' },
    { output: 'الثورة', transliteration: 'Althawra', english: 'Revolution' },
    { output: 'البطولة', transliteration: 'Albutula', english: 'Heroism' },
    { output: 'الأبدية', transliteration: 'Alabadia', english: 'Eternity' },
    { output: 'الحرية', transliteration: 'Alhurriya', english: 'Freedom' },
    { output: 'الصمود', transliteration: 'Alsamed', english: 'Resilience' },
    { output: 'الصبر', transliteration: 'Alsabr', english: 'Patience' },
];

export class PlanetArabicNounsTable extends Table{
    constructor() {
        super("Planet Arabic Nouns");
        let arabicPlanetNouns = PlanetArabicNouns.map((noun) => noun.output);
        this.ArrayAsTableEntries(arabicPlanetNouns);
    }
}
