import {Category} from "./Category";
import {CultureNameTable} from "./character/CultureNameTable";
import {AfricanFemaleNameTable} from "./name/african/AfricanFemaleNameTable";
import {GenderTable} from "./character/GenderTable";
import {AfricanMaleNameTable} from "./name/african/AfricanMaleNameTable";
import {GermanFemaleFirstnameTable} from "./name/german/GermanFemaleFirstnameTable";
import {
    GermanFemaleFirstnameFirst,
    GermanFemaleFirstnameFirstTable
} from "./name/german/GermanFemaleFirstnameFirstTable";
import {GermanFemaleFirstnameSecondTable} from "./name/german/GermanFemaleFirstnameSecondTable";
import {GermanMaleFirstnameTable} from "./name/german/GermanMaleFirstnameTable";
import {GermanMaleFirstnameFirstTable} from "./name/german/GermanMaleFirstnameFirstTable";
import {GermanMaleFirstnameSecondTable} from "./name/german/GermanMaleFirstnameSecondTable";
import {GermanFemaleFirstnameSingleTable} from "./name/german/GermanFemaleFirstnameSingleTable";

const characterTables = [new GenderTable(), new CultureNameTable()];
const characterCategory = new Category("Character Tables", characterTables);

const nameTables = [
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

export const AllTables: Category[] = [
    characterCategory,
    nameCategory,
      ];