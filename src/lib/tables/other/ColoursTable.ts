import {Table} from "../Table";

export const Colours = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "black", "white", "purple",
    "gray", "pink", "purple", "teal", "cyan", "magenta", "aquamarine", "silver", "golden", "beige", "azure", "bronze",
    "brown",
];


export class ColoursTable extends Table{

    constructor() {
        super("Colours");
        this.ArrayAsTableEntries(Colours);
    }

}