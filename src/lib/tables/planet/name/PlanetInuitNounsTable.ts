import {Table} from "../../Table";

export let PlanetInuitNouns = [
    { output: 'silaa', english: 'Weather' },
    { output: 'nuna', english: 'Land' },
    { output: 'im', english: 'Water' },
    { output: 'tup', english: 'Tent' },
    { output: 'put', english: 'Hill' },
    { output: 'qaj', english: 'Kayak' },
    { output: 'quvia', english: 'Joyful' },
    { output: 'auj', english: 'Summer' },
    { output: 'uki', english: 'Winter' },
    { output: 'nats', english: 'Seal' },
    { output: 'nan', english: 'Polar Bear' },
    { output: 'qil', english: 'Sky' },
    { output: 'tatq', english: 'Sun' },
    { output: 'tari', english: 'Sea' },
    { output: 'aniq', english: 'Trail' },
    { output: 'nuli', english: 'Partner' },
    { output: 'aull', english: 'Journey' },
    { output: 'annur', english: 'Storm' },
    { output: 'tuksi', english: 'Feather' },
    { output: 'qimirru', english: 'Snowflake' },
    { output: 'qimmir', english: 'Dog' },
    { output: 'amar', english: 'Wolf' },
    { output: 'tungujul', english: 'Younger sibling' },
    { output: 'iqalu', english: 'Fish' },
    { output: 'taqq', english: 'Moon' },
    { output: 'nun', english: 'Baby Seal' },
    { output: 'kinauvit', english: 'We are happy' },
    { output: 'uqalimaar', english: 'Storyteller' },
    { output: 'tarratta', english: 'Travel' },
    { output: 'aput', english: 'Snow on ground' },
    { output: 'munam', english: 'Beautiful' },
    { output: 'angijuqqa', english: 'Elder' },
];

export class PlanetInuitNounsTable extends Table{
    constructor() {
        super("Planet Inuit Nouns");
        let inuitPlanetNouns = PlanetInuitNouns.map((noun) => noun.output);
        this.ArrayAsTableEntries(inuitPlanetNouns);
    }
}
