import {Table} from "../Table";

export const AgeNames = ["just-created", "young", "middle-aged", "old", "ancient"];


export class AgeTable extends Table{

    constructor() {
        super("Age");
        this.ArrayAsTableEntries(AgeNames);
    }

}