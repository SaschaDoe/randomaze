import {Category} from "./Category";
import {CultureNameTable} from "./character/CultureNameTable";
import {AfricanFemaleNameTable} from "./name/AfricanFemaleNameTable";
import {GenderTable} from "./character/GenderTable";

const characterTables = [new GenderTable(), new CultureNameTable()];
const characterCategory = new Category("Character Tables", characterTables);

const nameTables = [new AfricanFemaleNameTable(), new AfricanFemaleNameTable()];
const nameCategory = new Category("Name Tables", nameTables);

export const AllTables: Category[] = [
    characterCategory,
    nameCategory,
      ];