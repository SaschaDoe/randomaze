import {Culture} from "./Culture";
import {Dice} from "../../tables/Dice";
import {Table} from "../../tables/Table";
import {GermanMaleFirstnameTable} from "../../tables/name/german/GermanMaleFirstnameTable";
import {AfricanMaleNameTable} from "../../tables/name/african/AfricanMaleNameTable";
import {GermanFemaleFirstnameTable} from "../../tables/name/german/GermanFemaleFirstnameTable";
import {AfricanFemaleNameTable} from "../../tables/name/african/AfricanFemaleNameTable";

const cultureNameTables = {
    german: {
        male: new GermanMaleFirstnameTable(),
        female: new GermanFemaleFirstnameTable(),
    },
    african: {
        male: new AfricanMaleNameTable(),
        female: new AfricanFemaleNameTable(),
    }
};

export class NameCreator {
    private gender: string;
    private culture: Culture;

    withGender(gender: string) {
        this.gender = gender;
        return this;
    }

    withCulture(culture: Culture) {
        this.culture = culture;
        return this;
    }

    create(dice?: Dice) {
        let table: Table;
        if (this.culture.name in cultureNameTables) {
            let tablesForCulture = cultureNameTables[this.culture.name];
            if (this.gender in tablesForCulture) {
                table = tablesForCulture[this.gender];
            }
        }

        if (!table) {
            throw new Error(`No name table found for culture "${this.culture.name}" and gender "${this.gender}"`);
        }

        return table.roll(dice).string;
    }
}
