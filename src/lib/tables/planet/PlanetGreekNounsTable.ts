import {Table} from "../Table";
export let PlanetGreekNouns = [
    { output: 'phōt', english: 'Light' },
    { output: 'eirēn', english: 'Peace' },
    { output: 'sidēr', english: 'Iron' },
    { output: 'pyr', english: 'Fire' },
    { output: 'hydr', english: 'Water' },
    { output: 'anem', english: 'Wind' },
    { output: 'aith', english: 'Ether/Sky' },
    { output: 'gē', english: 'Earth' },
    { output: 'dendr', english: 'Tree' },
    { output: 'thálass', english: 'Sea' },
    { output: 'hēl', english: 'Sun' },
    { output: 'selēn', english: 'Moon' },
    { output: 'astr', english: 'Star' },
    { output: 'chrys', english: 'Gold' },
    { output: 'argyr', english: 'Silver' },
    { output: 'chion', english: 'Snow' },
    { output: 'neph', english: 'Cloud' },
    { output: 'astrap', english: 'Lightning' },
    { output: 'chron', english: 'Time' },
    { output: 'ech', english: 'Sound' },
    { output: 'hypn', english: 'Sleep' },
    { output: 'pneum', english: 'Spirit' },
    { output: 'kardi', english: 'Heart' },
    { output: 'phon', english: 'Voice' },
    { output: 'moira', english: 'Fate' },
    { output: 'alēthe', english: 'Truth' },
    { output: 'arete', english: 'Virtue' },
    { output: 'soph', english: 'Wisdom' },
    { output: 'thar', english: 'Courage' },
    { output: 'erota', english: 'Love' },
    { output: 'hero', english: 'Hero' },
    { output: 'kataklysmos', english: 'Cataclysm' },
    { output: 'doxa', english: 'Glory' },
    { output: 'thavm', english: 'Wonder' },
    { output: 'tele', english: 'Distance' },
    { output: 'zōē', english: 'Life' },
    { output: 'phil', english: 'Friend' },
];

export class PlanetGreekNounsTable extends Table{
    constructor() {
        super("Planet Greek Nouns");
        let greekPlanetNouns = PlanetGreekNouns.map((noun) => noun.output);
        this.ArrayAsTableEntries(greekPlanetNouns);
    }
}
