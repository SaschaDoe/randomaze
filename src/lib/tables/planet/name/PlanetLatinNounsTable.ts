import {Table} from "../../Table";

export let PlanetLatinNouns = [
    { output: 'Lux', english: 'Light' },
    { output: 'Pax', english: 'Peace' },
    { output: 'Ferr', english: 'Iron' },
    { output: 'Ign', english: 'Fire' },
    { output: 'Aqua', english: 'Water' },
    { output: 'Vent', english: 'Wind' },
    { output: 'Aether', english: 'Ether/Sky' },
    { output: 'Terr', english: 'Earth' },
    { output: 'Silv', english: 'Forest' },
    { output: 'Mare', english: 'Sea' },
    { output: 'Stell', english: 'Star' },
    { output: 'Aur', english: 'Gold' },
    { output: 'Argent', english: 'Silver' },
    { output: 'Nix', english: 'Snow' },
    { output: 'Nub', english: 'Cloud' },
    { output: 'Fulg', english: 'Lightning' },
    { output: 'Temp', english: 'Time' },
    { output: 'Son', english: 'Sound' },
    { output: 'Somn', english: 'Sleep' },
    { output: 'Spiri', english: 'Spirit' },
    { output: 'Cor', english: 'Heart' },
    { output: 'Vox', english: 'Voice' },
    { output: 'Fat', english: 'Fate' },
    { output: 'Verit', english: 'Truth' },
    { output: 'Virt', english: 'Virtue' },
    { output: 'Sapient', english: 'Wisdom' },
    { output: 'Audaci', english: 'Courage' },
];

export class PlanetLatinNounsTable extends Table{
    constructor() {
        super("Planet Nouns");
        let latinPlanetNouns = PlanetLatinNouns.map((noun) => noun.output);
        this.ArrayAsTableEntries(latinPlanetNouns);
    }

}