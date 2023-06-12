import {Table} from "../Table";
export let Genders = ["male", "female"];
export class GenderTable extends Table{
    constructor() {
        super("Gender");
        this.ArrayAsTableEntries(Genders);
    }
}