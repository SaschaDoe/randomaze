import {Entry} from "../Entry";
import {Table} from "../Table";


export class CultureNameTable extends Table{
    public static readonly CultureNames: string[] = [
        "African",
        ];
    constructor() {
        super("Culture Names");
        for(let i = 0; i < CultureNameTable.CultureNames.length; i++){
            let entry = new Entry(CultureNameTable.CultureNames[i]);
            this.entries.push(entry);
        }
    }
}