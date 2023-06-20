import {Category} from "./Category";
import {CultureNameTable} from "./character/CultureNameTable";
import {AfricanFemaleNameTable} from "./name/african/AfricanFemaleNameTable";
import {GenderTable} from "./character/GenderTable";
import {AfricanMaleNameTable} from "./name/african/AfricanMaleNameTable";
import {GermanFemaleFirstnameTable} from "./name/german/GermanFemaleFirstnameTable";
import {GermanFemaleFirstnameFirstTable} from "./name/german/GermanFemaleFirstnameFirstTable";
import {GermanFemaleFirstnameSecondTable} from "./name/german/GermanFemaleFirstnameSecondTable";
import {GermanMaleFirstnameTable} from "./name/german/GermanMaleFirstnameTable";
import {GermanMaleFirstnameFirstTable} from "./name/german/GermanMaleFirstnameFirstTable";
import {GermanMaleFirstnameSecondTable} from "./name/german/GermanMaleFirstnameSecondTable";
import {GermanFemaleFirstnameSingleTable} from "./name/german/GermanFemaleFirstnameSingleTable";
import {GalaxyDescriptorsTable} from "./galaxy/GalaxyDescriptorsTable";
import {GalaxyNounsTable} from "./galaxy/GalaxyNounsTable";
import {GalaxyNameTable} from "./galaxy/GalaxyNameTable";
import {GalaxyTypeTable} from "./galaxy/GalaxyTypeTable";
import {RandomNameTable} from "./name/RandomNameTable";
import {ColoursTable} from "./other/ColoursTable";
import {SizeTable} from "./other/SizeTable";
import {AgeTable} from "./other/AgeTable";
import {SolarSystemNameTable} from "./solarSystem/SolarSystemNameTable";
import {SolarSystemDescriptorsTable} from "./solarSystem/SolarSystemDescriptorsTable";
import {SolarSystemStageTable} from "./solarSystem/SolarSystemStageTable";
import {PlanetNameDarkTable} from "./planet/name/PlanetNameDarkTable";
import {PlanetNameTable} from "./planet/name/PlanetNameTable";
import {PlanetTypeTable} from "./planet/PlanetTypeTable";

const characterTables = [new GenderTable(), new CultureNameTable()];
const characterCategory = new Category("Character Tables", characterTables);

const nameTables = [
    new RandomNameTable(),
    new AfricanFemaleNameTable(),
    new AfricanMaleNameTable(),
    new GermanFemaleFirstnameTable(),
    new GermanFemaleFirstnameFirstTable(),
    new GermanFemaleFirstnameSecondTable(),
    new GermanFemaleFirstnameSingleTable(),
    new GermanMaleFirstnameTable(),
    new GermanMaleFirstnameFirstTable(),
    new GermanMaleFirstnameSecondTable(),
];
const nameCategory = new Category("Name Tables", nameTables);

const galaxyTables = [
    new GalaxyTypeTable(),
    new GalaxyNameTable(),
    new GalaxyDescriptorsTable(),
    new GalaxyNounsTable(),
];
const galaxyCategory = new Category("Galaxy Tables", galaxyTables);

const solarSystemTables = [
    new SolarSystemNameTable(),
    new SolarSystemDescriptorsTable(),
    new SolarSystemStageTable(),
];
const solarSystemCategory = new Category("Solar System Tables", solarSystemTables);

const planetTables = [
    new PlanetNameTable(),
    new PlanetNameDarkTable(),
    new PlanetTypeTable(),
];
const planetCategory = new Category("Planet Tables", planetTables);


const otherTables = [
    new AgeTable(),
   new ColoursTable(),
    new SizeTable(),
];
const otherCategory = new Category("Other Tables", otherTables);

export const AllTables: Category[] = [
    characterCategory,
    nameCategory,
    galaxyCategory,
    solarSystemCategory,
    planetCategory,
    otherCategory,
      ];