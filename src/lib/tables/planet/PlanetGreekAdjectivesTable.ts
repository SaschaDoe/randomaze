import {Table} from "../Table";

export let PlanetGreekAdjectives = [
    { output: 'megal', english: 'Big' },
    { output: 'kal', english: 'Good' },
    { output: 'pol', english: 'Many' },
    { output: 'agath', english: 'Noble' },
    { output: 'dys', english: 'Bad' },
    { output: 'makr', english: 'Long' },
    { output: 'therm', english: 'Hot' },
    { output: 'psuchr', english: 'Cold' },
    { output: 'ne', english: 'New' },
    { output: 'palai', english: 'Old' },
    { output: 'leuk', english: 'White' },
    { output: 'melan', english: 'Black' },
    { output: 'er', english: 'Red' },
    { output: 'xan', english: 'Blond' },
    { output: 'phae', english: 'Dark' },
    { output: 'is', english: 'Equal' },
    { output: 'heter', english: 'Different' },
    { output: 'prot', english: 'First' },
    { output: 'eschat', english: 'Last' },
    { output: 'hyper', english: 'Above' },
    { output: 'hypo', english: 'Below' },
    { output: 'aion', english: 'Eternal' },
    { output: 'dynam', english: 'Powerful' },
    { output: 'stoic', english: 'Unyielding' },
    { output: 'phosphor', english: 'Light-bringing' },
    { output: 'astr', english: 'Starry' },
    { output: 'ge', english: 'Earth-like' },
    { output: 'thalass', english: 'Sea-like' },
    { output: 'pyr', english: 'Fire-like' },
    { output: 'selene', english: 'Moon-like' },
    { output: 'helio', english: 'Sun-like' },
    { output: 'ether', english: 'Ether/Sky-like' },
    { output: 'hydor', english: 'Water-like' },
    { output: 'sider', english: 'Iron-like' },
    { output: 'nefel', english: 'Cloud-like' },
    { output: 'chrys', english: 'Golden' },
    { output: 'argyr', english: 'Silvern' },
];

export class PlanetGreekAdjectivesTable extends Table{
    constructor() {
        super("Planet Greek Adjectives");
        let greekPlanetAdjectives = PlanetGreekAdjectives.map((adjective) => adjective.output);
        this.ArrayAsTableEntries(greekPlanetAdjectives);
    }
}
