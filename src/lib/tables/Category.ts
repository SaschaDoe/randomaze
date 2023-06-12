import {Table} from "./Table";

export class Category{
    public readonly name: string;
    public tables: Table[];
    public isOpen: boolean = false;
    constructor(name: string, tables: Table[]) {
        this.name = name;
        this.tables = tables;
    }
}