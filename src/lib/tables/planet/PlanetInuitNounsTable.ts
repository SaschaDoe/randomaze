import {Table} from "../Table";

export let PlanetInuitNouns = [
    { output: 'silaa', english: 'Weather' },
    { output: 'nuna', english: 'Land' },
    { output: 'imiq', english: 'Water' },
    { output: 'tupiq', english: 'Tent' },
    { output: 'putuguq', english: 'Hill' },
    { output: 'qajaq', english: 'Kayak' },
    { output: 'quviasuk', english: 'Joyful' },
    { output: 'aujaq', english: 'Summer' },
    { output: 'ukiuq', english: 'Winter' },
    { output: 'natsiq', english: 'Seal' },
    { output: 'nanuq', english: 'Polar Bear' },
    { output: 'qilak', english: 'Sky' },
    { output: 'tatqiq', english: 'Sun' },
    { output: 'tariuq', english: 'Sea' },
    { output: 'aniq', english: 'Trail' },
    { output: 'nuliaq', english: 'Partner' },
    { output: 'aullaq', english: 'Journey' },
    { output: 'annuraq', english: 'Storm' },
    { output: 'tuksi', english: 'Feather' },
    { output: 'qimirruaq', english: 'Snowflake' },
    { output: 'qimmir', english: 'Dog' },
    { output: 'amaruq', english: 'Wolf' },
    { output: 'tungujuluk', english: 'Younger sibling' },
    { output: 'iqalu', english: 'Fish' },
    { output: 'taqqiq', english: 'Moon' },
    { output: 'nuniq', english: 'Baby Seal' },
    { output: 'kinauvit', english: 'We are happy' },
    { output: 'uqalimaarik', english: 'Storyteller' },
    { output: 'tarratta', english: 'Travel' },
    { output: 'aput', english: 'Snow on ground' },
    { output: 'munameg', english: 'Beautiful' },
    { output: 'angijuqqaag', english: 'Elder' },
];

export class PlanetInuitNounsTable extends Table{
    constructor() {
        super("Planet Inuit Nouns");
        let inuitPlanetNouns = PlanetInuitNouns.map((noun) => noun.output);
        this.ArrayAsTableEntries(inuitPlanetNouns);
    }
}
