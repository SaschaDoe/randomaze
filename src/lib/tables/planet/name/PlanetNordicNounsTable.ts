import {Table} from "../../Table";

export let PlanetNorwegianNouns = [
    { output: 'Lys', english: 'Light' },
    { output: 'Fred', english: 'Peace' },
    { output: 'Jern', english: 'Iron' },
    { output: 'Ild', english: 'Fire' },
    { output: 'Vann', english: 'Water' },
    { output: 'Vind', english: 'Wind' },
    { output: 'Jord', english: 'Earth' },
    { output: 'Skog', english: 'Forest' },
    { output: 'Hav', english: 'Sea' },
    { output: 'Sol', english: 'Sun' },
    { output: 'Måne', english: 'Moon' },
    { output: 'Stjerne', english: 'Star' },
    { output: 'Gull', english: 'Gold' },
    { output: 'Sølv', english: 'Silver' },
    { output: 'Snø', english: 'Snow' },
    { output: 'Sky', english: 'Cloud' },
    { output: 'Lyn', english: 'Lightning' },
    { output: 'Tid', english: 'Time' },
    { output: 'Lyde', english: 'Sound' },
    { output: 'Drøm', english: 'Dream' },
    { output: 'Ånd', english: 'Spirit' },
    { output: 'Hjerte', english: 'Heart' },
    { output: 'Sannhet', english: 'Truth' },
    { output: 'Mot', english: 'Courage' },
    { output: 'Vis', english: 'Wisdom' },
    { output: 'Håp', english: 'Hope' },
    { output: 'Skjønnhet', english: 'Beauty' },
    { output: 'Evighet', english: 'Eternity' },
    { output: 'Lykke', english: 'Happiness' },
    { output: 'Eventyr', english: 'Adventure' },
    { output: 'Ære', english: 'Honor' },
    { output: 'Kraft', english: 'Power' },
    { output: 'Skjebne', english: 'Destiny' },
    { output: 'Tro', english: 'Belief' },
];

export class PlanetNorwegianNounsTable extends Table{
    constructor() {
        super("Planet Norwegian Nouns");
        let outputPlanetNouns = PlanetNorwegianNouns.map((noun) => noun.output);
        this.ArrayAsTableEntries(outputPlanetNouns);
    }
}
