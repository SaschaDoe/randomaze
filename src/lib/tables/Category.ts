import {Table} from "./Table";

export class Category{
    public readonly name: string;
    private tables: Table[];
    constructor(name: string, tables: Table[]) {
        this.name = name;
        this.tables = tables;
    }
}