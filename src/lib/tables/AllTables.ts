import {Category} from "./Category";
import {CultureNameTable} from "./character/CultureNameTable";

const characterTables = [new CultureNameTable()]
const characterCategory = new Category("Character", characterTables);

export const AllTables: Category[] = [
    characterCategory,
      ];