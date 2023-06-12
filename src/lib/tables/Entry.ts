import {RollResult} from "./RollResult";

export abstract class Entry {
    public readonly displayedText: string;
    protected constructor(labelInTable: string) {
        this.displayedText = labelInTable;
    }
    execute(rollResult: RollResult) {
        throw new Error("Not implemented");
    }
}