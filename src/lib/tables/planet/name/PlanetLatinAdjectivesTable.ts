import {Table} from "../../Table";

export let PlanetLatinAdjectives = [
    { output: 'magn', english: 'Large' },
    { output: 'clar', english: 'Bright' },
    { output: 'obscur', english: 'Dark' },
    { output: 'frigid', english: 'Cold' },
    { output: 'calid', english: 'Hot' },
    { output: 'alt', english: 'High' },
    { output: 'nov', english: 'New' },
    { output: 'antiqu', english: 'Old' },
    { output: 'amic', english: 'Friendly' },
    { output: 'hostil', english: 'Hostile' },
    { output: 'vivid', english: 'Alive' },
    { output: 'fort', english: 'Strong' },
    { output: 'belli', english: 'War' },
    { output: 'pac', english: 'Peace' },
    { output: 'rapid', english: 'Fast' },
    { output: 'lent', english: 'Slow' },
    { output: 'juven', english: 'Young' },
    { output: 'sen', english: 'Old' },
    { output: 'dulc', english: 'Sweet' },
    { output: 'amor', english: 'Love' },
    { output: 'mal', english: 'Bad' },
    { output: 'bon', english: 'Good' },
    { output: 'pulchr', english: 'Beautiful' },
    { output: 'felic', english: 'Happy' },
    { output: 'trist', english: 'Sad' },
];

export class PlanetLatinAdjectivesTable extends Table{
    constructor() {
        super("Planet Adjectives");
        let latinPlanetNouns = PlanetLatinAdjectives.map((noun) => noun.output);
        this.ArrayAsTableEntries(latinPlanetNouns);
    }

}