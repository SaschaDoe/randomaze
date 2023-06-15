import {Table} from "../Table";
/*
export const CssColors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "black", "white", "purple",
    "gray", "pink", "purple", "teal", "cyan", "magenta", "aquamarine", "silver", "beige", "brown"
];
*/
export const CssColors = ["black"
];

export class ColoursTable extends Table{

    constructor() {
        super("Colors");
        this.ArrayAsTableEntries(CssColors);
    }

}