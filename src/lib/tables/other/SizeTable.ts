import {Table} from "../Table";

export const Sizes = ["tiny", "small", "medium", "large", "gigantic",
];

export class SizeTable extends Table{

    constructor() {
        super("Sizes");
        this.ArrayAsTableEntries(Sizes);
    }
}